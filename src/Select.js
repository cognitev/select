import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { css } from 'emotion';
import classnames from 'classnames';

/* Theme */
const theme = {
  themeColor: '#03A9F4',
  borderColor: '#e6e6e6',
  borderColorHover: '#03A9F4',
  menuMaxHeight: 300,
};

/* Create the root element for Select */
let root = document.getElementById('selectalot-root');

if (!root) {
  root = document.createElement('div');
  root.id = 'selectalot-root';
  document.body.appendChild(root);
}

/* Create context for Select */
const Context = React.createContext();

/* =========================================================================== */
/* Option Class
/* =========================================================================== */

export class Option extends Component {
  static contextType = Context;
  
  static propTypes = {
    path: PropTypes.string,
    labelPath: PropTypes.string,
    value: PropTypes.string,
    selected: PropTypes.bool,
    disabled: PropTypes.bool,
    options: PropTypes.arrayOf(PropTypes.shape({
      label: PropTypes.node.isRequired,
      value: PropTypes.string.isRequired,
      selected: PropTypes.bool,
      disabled: PropTypes.bool,
    })),
    renderOptions: PropTypes.func,
    children: PropTypes.node,
    className: PropTypes.string,
    $level: PropTypes.number,
  };

  static defaultProps = {
    path: '',
    labelPath: '',
    value: '',
    selected: false,
    disabled: false,
    options: [],
    renderOptions: () => null,
    children: null,
    className: '',
    $level: 0,
  };

  handleClick = () => {
    const {
      value,
      children: label,
      path,
      labelPath,
    } = this.props;

    this.context.onItemClick({
      value,
      label,
      path,
      labelPath,
    });
  }

  render() {
    const {
      path,
      labelPath,
      value,
      selected,
      disabled,
      options,
      renderOptions,
      children: label,
      className,
      $level,
      ...props
    } = this.props;

    const childOptions = renderOptions() || (
      options.length > 0 && options.map((option, index) => (
        <Option
          key={index}
          path={`${path ? `${path}/` : ''}${option.value}`}
          labelPath={`${labelPath ? `${labelPath}/` : ''}${option.label}`}
          value={option.value}
          selected={option.selected}
          disabled={option.disabled}
          options={option.options}
        >
          {option.label}
        </Option>
      ))
    );

    const childList = childOptions && (
      <ul
        className={className}
        {...props}
      >
        {childOptions}
      </ul>
    );

    if (!label) {
      return childList;
    }

    return (
      <li
        className={
          classnames(className, {
            'is-selected': selected,
            'is-disabled': disabled,
          })
        }
        {...props}
      >
        <div
          onClick={this.handleClick}
          className={css`
            display: inline-block;
            width: 100%;
            padding: 10px;
            padding-left: ${$level * 30 + 10}
            cursor: pointer;
            user-select: none;
            background-color: #fff;
            box-sizing: border-box;
            transition: 150ms background-color;

            &:hover,
            &:focus {
              background-color: #f9f9f9;
            }

            &:active {
              background-color: #f6f6f6;
            }

            .is-selected > & {
              color: ${theme.themeColor};
            }

            .is-disabled > & {
              cursor: default;
              color: #ccc;
              background-color: #fff;
            }
          `}
        >
          {label}
        </div>

        {childList}
      </li>
    );
  }
}

/* =========================================================================== */
/* OptGroup Class
/* =========================================================================== */

export class OptGroup extends Component {
  static propTypes = {
    label: PropTypes.node.isRequired,
    options: PropTypes.arrayOf(PropTypes.shape({
      label: PropTypes.node.isRequired,
      value: PropTypes.string.isRequired,
      selected: PropTypes.bool,
      disabled: PropTypes.bool,
    })),
  };

  static defaultProps = {
    options: null,
  };

  render() {
    const {
      label,
      options,
      children,
    } = this.props;

    return React.createElement(Option, {
      options,
      renderOptions: () => children,
    }, label);
  }
}

/* =========================================================================== */
/* Select Class
/* =========================================================================== */

class Select extends Component {
  static propTypes = {
    options: PropTypes.arrayOf(PropTypes.shape({
      label: PropTypes.node.isRequired,
      value: PropTypes.string.isRequired,
      selected: PropTypes.bool,
      disabled: PropTypes.bool,
    })),
  };

  static defaultProps = {
    options: null,
  };

  state = {
    active: false,
    menuRect: {
      top: 0,
      left: 0,
      width: 0,
      height: 0,
    },
    selection: [],
  };

  /* Toggle menu visibility */
  
  toggleMenu = () => {
    const {
      active,
    } = this.state;

    if (active) {
      this.closeMenu();
    } else {
      this.openMenu();
    }
  };

  openMenu = () => {
    const menuRect = this.node.getBoundingClientRect();

    window.addEventListener('mousedown', this.handleClickOutside);

    this.setState({
      active: true,
      menuRect,
    });
  };

  closeMenu = () => {
    window.removeEventListener('mousedown', this.handleClickOutside);

    this.setState({
      active: false,
    });
  };

  handleClickOutside = (e) => {
    if (
      this.node !== e.target &&
      !this.node.contains(e.target) &&
      !root.contains(e.target)
    ) {
      this.closeMenu();
    }
  };

  componentWillUnmount() {
    window.removeEventListener('mousedown', this.handleClickOutside);
  }

  /* Item click */

  handleItemClick = (item) => {
    this.setState((state) => {
      const selection = [
        ...state.selection,
        item,
      ];

      const parts = item.path.split('/');
      const selectionTree = { ...state.selectionTree };
      let leaf = selectionTree;

      while (parts.length > 1) {
        const part = parts.shift();
        leaf[part] = leaf[part] || {};
        leaf[part].items = leaf[part].items || {};

        if (parts.length === 1) {
          leaf[part].items = {
            ...leaf[part].items,
            [parts[0]]: {
              data: item,
            },
          };
        } else {
          leaf = leaf[part].items;
        }
      }

      return {
        selection,
        selectionTree,
      }
    });
  };

  /* Render */

  render() {
    const {
      options,
      children,
    } = this.props;

    const {
      active,
      menuRect,
      selection,
    } = this.state;

    window.top.s = selection;

    return (
      <Context.Provider value={{
        menuRect,
        onItemClick: this.handleItemClick,
      }}>
        <div
          ref={(el) => { this.node = el; }}
        >
          <div
            onClick={this.toggleMenu}
            className={css`
              position: relative;
              display: inline-block;
              width: 100%;
              padding: 10px;
              font: inherit;
              line-height: 1;
              cursor: pointer;
              border: 1px solid ${theme.borderColor};
              background: #fff;
              border-radius: 4px;
              box-sizing: border-box;
              transition: 150ms border-color;
              user-select: none;

              &.is-active,
              &:hover {
                border-color: ${theme.borderColorHover};
              }

              &:before {
                content: '';
                position: absolute;
                top: calc(50% - 2px);
                right: 10px;
                display: block;
                border: 4px solid transparent;
                border-top-color: #333;
              }
            `}
          >
            Trigger
          </div>

          <div>
            {
              selection.map((item) => item.label).join(', ')
            }
          </div>

          {
            active && (
              ReactDOM.createPortal(
                <Option
                  options={options}
                  renderOptions={
                    () => children
                  }
                  className={css`
                    position: fixed;
                    z-index: 10000;
                    top: ${menuRect.y + menuRect.height + 4}px;
                    left: ${menuRect.x}px;
                    width: ${menuRect.width}px;
                    max-height: ${theme.menuMaxHeight}px;
                    overflow: auto;
                  `}
                />,
                root
              )
            )
          }
        </div>
      </Context.Provider>
    );
  }
}

export default Select;

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { css } from 'emotion';
import classnames from 'classnames';

/* Theme */
const borderColor = '#e6e6e6';
const borderColorHover = '#03A9F4';

/* Create the root element for Select */
let root = document.getElementById('selectalot-root');

if (!root) {
  root = document.createElement('div');
  root.id = 'selectalot-root';
  document.body.appendChild(root);
}

/* Create context for Select */
const Context = React.createContext();

/* Components */

class Option extends Component {
  static propTypes = {
    label: PropTypes.string,
    value: PropTypes.string,
    parent: PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.string,
      items: PropTypes.array,
    }),
    data: PropTypes.any,
    children: PropTypes.node,
  };

  static defaultProps = {
    label: '',
    value: '',
    parent: null,
    data: null,
    children: null,
  };

  static contextType = Context;

  handleClick = (e) => {
    e.preventDefault();
    e.stopPropagation();

    this.context.onItemClick({
      data: this.props.data,
      path: this.getPath('value'),
      labelPath: this.getPath('label'),
    });
  };

  getPath = (prop) => {
    const traversePath = (item) => `${item.parent ? `${traversePath(item.parent)}/` : ''}${item[prop]}`;
    return traversePath(this.props);
  }
  
  render() {
    const {
      data,
      className,
      children,
    } = this.props;

    const {
      selectionString,
    } = this.context;
    
    const path = this.getPath();
    const isSelected = selectionString.indexOf(path, 0) !== -1;
    const hasItems = data.items && data.items.length > 0;

    return (
      <li
        className={classnames(className, {
          'is-selected': isSelected,
          'has-items': hasItems,
        })}
        onClick={this.handleClick}
      >
        {this.context.renderItem(this.props.data) || children}
      </li>
    );
  }
}

class List extends Component {
  static propTypes = {
    parent: PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.string,
      items: PropTypes.array,
    }),
    items: PropTypes.arrayOf(PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.string,
      items: PropTypes.array,
    })),
  };

  static defaultProps = {
    parent: null,
    items: [],
  };

  render() {
    const {
      parent,
      items,
    } = this.props;
    
    return (
      <ul
        className={css`
          position: fixed;
          list-style: none;
          margin: -2px 0 0;
          padding: 0;
          font-size: 14px;
          border: 1px solid #03A9F4;
          border-radius: 4px;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
        `}
      >
        {
          items.map((item, index) => {
            return (
              <Option
                key={index}
                label={item.label}
                value={item.value}
                parent={parent}
                data={item}
              >
                {item.label}

                {
                  typeof item.items !== 'undefined' && (
                    <List
                      parent={{
                        ...item,
                        parent,
                      }}
                      items={item.items}
                    />
                  )
                }
              </Option>
            );
          })
        }
      </ul>
    )
  }
}

class Select extends Component {
  static propTypes = {
    data: PropTypes.arrayOf(PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.string,
      items: PropTypes.array,
    })),
    placeholder: PropTypes.string,
    search: PropTypes.bool,
    multiple: PropTypes.bool,
    searchHandler: PropTypes.func,
    render: PropTypes.func,
    renderItem: PropTypes.func,
    onChange: PropTypes.func,
  };

  static defaultProps = {
    data: [],
    placeholder: 'Select an item...',
    search: false,
    multiple: false,
    searchHandler: null,
    render: () => null,
    renderItem: () => null,
    onChange: () => null,
  };

  static find = (data, searchQuery) => {
    return data.reduce(function testItems(matches, item) {
      const itemMatches = item.label.toLowerCase().includes(searchQuery.toLowerCase());
      let matchingItems = itemMatches ? item.items : item.items && item.items.reduce(testItems, []);

      if (itemMatches || (matchingItems && matchingItems.length > 0)) {
        return [
          ...matches,
          {
            ...item,
            items: matchingItems,
          },
        ];
      }

      return matches;
    }, []);
  }

  state = {
    active: false,
    loading: false,
    selection: [],
    searchQuery: '',
    filteredData: this.props.data,
  };

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
    const {
      search,
    } = this.props;

    window.addEventListener('mousedown', this.handleClickOutside);

    this.setState({
      active: true,
      searchQuery: '',
    }, () => {
      if (search) {
        this.searchField.focus();
      }
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

  handleItemClick = (item) => {
    const {
      multiple,
      onChange,
    } = this.props;

    const selection = multiple ? (
      [
        ...this.state.selection,
        item,
      ]
    ) : (
      [item]
    );
    
    this.setState({
      selection,
      active: false,
    });

    onChange(selection);
  };

  handleSearch = (e) => {
    this.setState({
      searchQuery: e.target.value,
    }, this.updateFilteredData);
  };

  updateFilteredData = () => {
    const {
      data,
      searchHandler,
    } = this.props;

    const {
      searchQuery,
    } = this.state;

    let filteredData = data;

    if (typeof searchHandler === 'function') {
      filteredData = searchHandler(data, searchQuery);

      if (filteredData instanceof Promise) {
        this.setState({
          loading: true,
        });
        
        return filteredData.then(data => this.setState({
          loading: false,
          filteredData: data,
        }));
      }
    } else {
      filteredData = Select.find(data, searchQuery);
    }
    
    this.setState({
      filteredData,
    });
  };

  componentWillUnmount() {
    window.removeEventListener('mousedown', this.handleClickOutside);
  }

  render() {
    const {
      data,
      placeholder,
      search,
      multiple,
      render,
      renderItem,
      searchHandler,
      ...props
    } = this.props;

    const {
      active,
      loading,
      selection,
      searchQuery,
      filteredData,
    } = this.state;

    /* Calculate display label and value */
    let selectionString, label;

    if (selection.length) {
      if (multiple) {
        label = selection.map(item => item.labelPath).join(',');
        selectionString = selection.map(item => item.path).join(',');
      } else {
        label = selection[0].data.label;
        selectionString = selection[0].data.value;
      }
    } else {
      label = placeholder;
      selectionString = '';
    }

    return (
      <Context.Provider value={{
        selection,
        selectionString,
        onItemClick: this.handleItemClick,
        renderItem,
      }}>
        <div
          ref={(el) => { this.node = el; }}
          className={classnames('select')}
        >
          {
            render(selection, () => {
              this.toggleMenu();
            }) || (
              <span
                className={classnames('select-trigger', css`
                  position: relative;
                  display: inline-block;
                  width: 100%;
                  padding: 10px;
                  font-size: 14px;
                  line-height: 1;
                  cursor: pointer;
                  border: 1px solid ${borderColor};
                  background: #fff;
                  border-radius: 4px;
                  box-sizing: border-box;
                  transition: 150ms border-color;
                  user-select: none;

                  &:hover {
                    border-color: ${borderColorHover};
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
                `)}
                onClick={this.toggleMenu}
              >
                {label}
              </span>
            )
          }

          {
            search && active && (
              <input
                type="text"
                ref={(el) => { this.searchField = el; }}
                value={searchQuery}
                onChange={this.handleSearch}
              />
            )
          }

          <input type="hidden" value={selectionString} {...props} />

          {
            active && (
              ReactDOM.createPortal(
                loading ? (
                  <div>Loading...</div>
                ) : (
                  <List items={filteredData} />
                ),
                root,
              )
            )
          }
        </div>
      </Context.Provider>
    );
  }
}

export default Select;

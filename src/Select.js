import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

/* Create the root element for Select */
let root = document.getElementById('selectalot-root');

if (!root) {
  root = document.createElement('div');
  root.id = 'selectalot-root';
  document.body.appendChild(root);
}

/* Create context for Select */
const Context = React.createContext();

class Option extends Component {
  static propTypes = {
    label: PropTypes.string,
    value: PropTypes.string,
    parent: PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.string,
      items: PropTypes.array,
    }),
    onClick: PropTypes.func,
    children: PropTypes.node,
  };

  static defaultProps = {
    label: '',
    value: '',
    parent: null,
    onClick: () => null,
    children: null,
  };

  static contextType = Context;

  getItemData = () => {
    const {
      label,
      value,
      parent,
    } = this.props;

    return {
      value,
      label,
      parent,
    };
  }

  handleClick = (e) => {
    e.preventDefault();
    e.stopPropagation();

    this.context.onItemClick(this.getItemData());
  };
  
  render() {
    const {
      children,
    } = this.props;

    return (
      <li onClick={this.handleClick}>
        {this.context.renderItem(this.getItemData()) || children}
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
    
    console.log(items);
    
    return (
      <ul>
        {
          items.map((item, index) => (
            <Option
              key={index}
              label={item.label}
              value={item.value}
              parent={parent}
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
          ))
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
    searchHandler: PropTypes.func,
    render: PropTypes.func,
    renderItem: PropTypes.func,
    onChange: PropTypes.func,
  };

  static defaultProps = {
    data: [],
    placeholder: 'Select an item...',
    search: false,
    searchHandler: null,
    render: () => null,
    renderItem: () => null,
    onChange: () => null,
  };

  static find = (data, searchQuery) => {
    return data.reduce(function testItems(matches, item) {
      let matchingItems = item.items && item.items.reduce(testItems, []);

      if (
        item.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (matchingItems && matchingItems.length > 0)
      ) {
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
      onChange,
    } = this.props;

    const selection = [item];
    
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

    /* Calculate display 'label' and 'value' */
    let value, label;

    if (selection[0]) {
      label = selection[0].label;
      value = selection[0].value;
    } else {
      label = placeholder;
      value = '';
    }

    return (
      <Context.Provider value={{
        onItemClick: this.handleItemClick,
        renderItem,
      }}>
        <div
          ref={(el) => { this.node = el; }}
        >
          {
            render(selection, () => {
              this.toggleMenu();
            }) || (
              <div onClick={this.toggleMenu}>
                {label}
              </div>
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

          <input type="hidden" value={value} {...props} />

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

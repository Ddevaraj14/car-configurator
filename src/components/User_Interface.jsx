import React, { useState, useEffect, useRef } from 'react';
import './Menu.css'; // Assuming you have some CSS for styling

const User_Interface = () => {
    const [activeMenu, setActiveMenu] = useState(1); // Set the first item as active by default
    const [subMenuVisible, setSubMenuVisible] = useState(true);
    const [activeSubMenuIndex, setActiveSubMenuIndex] = useState(7); // Set the first submenu item as active by default
    const subMenuRef = useRef(null); // Ref for the submenu ul element


  const mainMenuItems = [
    { id: 1, name: 'Virtual Drive', subMenus: ['Press OK to start'] },
    { id: 2, name: 'Interior', subMenus: ['Press OK to enter Interior 360o view'] },
    { id: 3, name: 'Environment', subMenus: ['1', '2'] },
    { id: 4, name: 'Views', subMenus: ['1', '2', '3', '4','5'] },
    { id: 5, name: 'Wheel', subMenus: ['1', '2', '3'] },
    { id: 6, name: 'Light', subMenus: ['1', '2'] },
    { id: 7, name: 'Body Color', subMenus: ['#080D10', '#FC9303', '#A6ADB7', '#0D1015','#1336EA','#001F4F','#C7D7E7'] },
  ];

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (subMenuVisible && (event.key === 'ArrowLeft' || event.key === 'ArrowRight')) {
        event.preventDefault(); // Prevent default behavior of arrow keys when submenu is visible
        handleSubMenuNavigation(event.key);
      } else {
        switch (event.key) {
          case 'ArrowUp':
            handleMenuNavigation('up');
            break;
          case 'ArrowDown':
            handleMenuNavigation('down');
            break;
          default:
            break;
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [activeMenu, activeSubMenuIndex, subMenuVisible]);

  const handleMenuNavigation = (direction) => {
    switch (direction) {
      case 'up':
        setActiveMenu((prevMenu) => {
          const newIndex = prevMenu ? prevMenu - 1 : mainMenuItems.length;
          return newIndex === 0 ? mainMenuItems.length : newIndex;
        });
        break;
      case 'down':
        setActiveMenu((prevMenu) => {
          const newIndex = prevMenu ? prevMenu + 1 : 1;
          return newIndex > mainMenuItems.length ? 1 : newIndex;
        });
        break;
      default:
        break;
    }
  };

  const handleSubMenuNavigation = (direction) => {
    const currentSubMenu = mainMenuItems.find((item) => item.id === activeMenu)?.subMenus;
    if (!currentSubMenu) return;

    switch (direction) {
      case 'ArrowLeft':
        setActiveSubMenuIndex((prevIndex) => Math.max(0, prevIndex - 1));
        break;
      case 'ArrowRight':
        setActiveSubMenuIndex((prevIndex) => Math.min(currentSubMenu.length - 1, prevIndex + 1));
        break;
      default:
        break;
    }
  };

  const handleSubMenuFocus = () => {
    setSubMenuVisible(true); // Set submenu visible when the main menu item is focused
    setActiveSubMenuIndex(0); // Reset active submenu index to the first item
  };

  return (
    <div className="menu">
      <ul className="main-menu">
        {mainMenuItems.map((item) => (
          <li
            key={item.id}
            className={activeMenu === item.id ? 'active' : ''}
            onClick={() => {
              setActiveMenu(item.id);
              setSubMenuVisible(true); // Set submenu visible when the main menu is clicked
            }}
            onFocus={handleSubMenuFocus} // Add onFocus event to handle submenu visibility when the main menu item is focused
          >
            {item.name}
            {activeMenu === item.id && (
              <ul
                ref={subMenuRef}
                className={`sub-menu ${subMenuVisible ? 'visible' : ''}`}
                tabIndex="-1" // Ensure submenu can receive focus
              >
                {item.id === 7
                  ? item.subMenus.map((color, index) => (
                      <li
                        key={index}
                        className={`color-menu-item ${activeSubMenuIndex === index ? 'active' : ''}`}
                        style={{ backgroundColor: color }}
                      ></li>
                    ))
                  : item.subMenus.map((submenu, index) => (
                      <li
                        key={index}
                        className={activeSubMenuIndex === index ? 'active' : ''}
                        onFocus={() => setActiveSubMenuIndex(index)}
                        tabIndex="0" // Add tabindex to make it focusable
                      >
                        {submenu}
                      </li>
                    ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default User_Interface;

import MenuItem from './MenuItem';

const MenuItemContainer = ({menuItems, addToOrder}) => {
    return (
        <div className='menu-container'>
                {menuItems.map((item) => (
                    <MenuItem key={item.id} item={item} addToOrderCallback={addToOrder} />
                ))}
        </div>
    );
}

export default MenuItemContainer;
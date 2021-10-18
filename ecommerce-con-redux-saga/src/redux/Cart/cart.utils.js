//verificar si ya se agrego la carta
export const existingCartItem = ({
    prevCartItems,
    nextCartItem
  }) => {
    return prevCartItems.find(
      cartItem => cartItem.documentID === nextCartItem.documentID
    );
  };
  
  export const handleAddToCart = ({
    prevCartItems,
    nextCartItem
  }) => {
    const quantityIncrement = 1;
    //para evitar agregar el mismo producto siempre
    const cartItemExists = existingCartItem({ prevCartItems, nextCartItem });
  
    //si ya se agrego esa carta sumo en cantidad
    if (cartItemExists) {
      return prevCartItems.map(cartItem =>
        cartItem.documentID == nextCartItem.documentID
          ? {
            ...cartItem,
            quantity: cartItem.quantity + quantityIncrement
          } : cartItem
      );
    }
  
    return [
      ...prevCartItems,
      {
        ...nextCartItem,
        quantity: quantityIncrement
      }
    ];
  };
  
  export const handleRemoveCartItem = ({
    prevCartItems,
    cartItemToRemove
  }) => {
    return prevCartItems.filter(item => item.documentID !== cartItemToRemove.documentID);
  }
  
  export const handleReduceCartItem = ({
    prevCartItems,
    cartItemToReduce
  }) => {
    const existingCartItem = prevCartItems.find(cartItem =>
      cartItem.documentID === cartItemToReduce.documentID);
  
    if (existingCartItem.quantity === 1) {
      return prevCartItems.filter(
        cartItem => cartItem.documentID !== existingCartItem.documentID
      );
    }
  
    return prevCartItems.map(cartItem =>
      cartItem.documentID === existingCartItem.documentID ?
      {
        ...cartItem,
        quantity: cartItem.quantity - 1
      } : cartItem)
  };
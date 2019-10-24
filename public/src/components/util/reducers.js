export const resortFilterState = {
  checkIn: null,
  checkOut: null,
  Guest: null,
  Price: null,
};

export const resortFilterReducer = (state, action) => {
  switch (action.type) {
    case 'date':
      return { ...state, checkIn: action.checkIn, checkOut: action.checkOut };
    case 'guest':
      return { ...state, Guest: action.guest };
    case 'price':
      return { ...state, Price: action.price };
  }
};

const initialState={
    data:[],
    isLoading:false,
    isError:false
}
const yazilarReducer = (state=initialState, action) => {
    switch (action.type) {
      case "FETCH_INIT":
        return {
          ...state,
          isLoading: true,
          isError: false,
        };
      case "FETCH_SUCCESS":
        return {
          ...state,
          isLoading: false,
          isError: false,
          data: action.payload,
        };
      case "FETCH_FAILURE":
        return {
          ...state,
          isLoading: false,
          isError: true,
        };
      case "REMOVE_POST":
        return {
          ...state,
          data: state.data.filter((post) => action.payload !== post.id),
        };
      default:
        return state;
    }
  };

  
  export default yazilarReducer;

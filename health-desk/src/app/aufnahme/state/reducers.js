const initialState = {
  step1Data: {},
  step2Data: {},
  step3Data: {},
  step4Data: {},
  step5Data: {},
  step6Data: {},
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SAVE_STEP1_DATA':
      return {
        ...state,
        step1Data: action.payload,
      };
    case 'SAVE_STEP2_DATA':
      return {
        ...state,
        step2Data: action.payload,
      };
    // Weitere Action-Handler
    default:
      return state;
  }
};

export default rootReducer;

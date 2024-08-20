const initialState = {
  step1Data: {},
  step2Data: {},
  step3Data: {},
  step4Data: {},
  step5Data: {},
  step6Data: {},
  step7Data: {}, // Added this line for completeness
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SAVE_STEP1_DATA':
      console.log('Saving Step 1 Data:', action.payload);
      return {
        ...state,
        step1Data: action.payload,
      };
    case 'SAVE_STEP2_DATA':
      console.log('Saving Step 2 Data:', action.payload);
      return {
        ...state,
        step2Data: action.payload,
      };
    case 'SAVE_STEP3_DATA':
      console.log('Saving Step 3 Data:', action.payload);
      return {
        ...state,
        step3Data: action.payload,
      };
    case 'SAVE_STEP4_DATA':
      console.log('Saving Step 4 Data:', action.payload);
      return {
        ...state,
        step4Data: action.payload,
      };
    case 'SAVE_STEP5_DATA':
      console.log('Saving Step 5 Data:', action.payload);
      return {
        ...state,
        step5Data: action.payload,
      };
    case 'SAVE_STEP6_DATA':
      console.log('Saving Step 6 Data:', action.payload);
      return {
        ...state,
        step6Data: action.payload,
      };
    case 'SAVE_STEP7_DATA':
      console.log('Saving Step 7 Data:', action.payload);
      return {
        ...state,
        step7Data: action.payload,
      };
    // Weitere Action-Handler
    default:
      return state;
  }
};

export default rootReducer;

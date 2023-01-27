const errorMessage = ref("error message");

export default () => {
    const setError = (error) => {
        errorMessage.value = error;
    }

    const resetError = () => errorMessage.value = null;

    return { setError, resetError, errorMessage }
};
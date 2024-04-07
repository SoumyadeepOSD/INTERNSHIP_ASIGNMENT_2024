export const sendEmailHelperFunction = async ({ email }) => {
    try {
        const response = await fetch('http:///auth/email-verification',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: email
                }),
            });
        console.log(response.message);
    } catch (error) {
        console.log(error);
    }
};

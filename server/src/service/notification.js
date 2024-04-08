const axios = require('axios');
const sendNotice = async (message) => {
    try {
        const result = await axios({
            method: 'post',
            url: 'https://exp.host/--/api/v2/push/send',
            headers: {
                'Content-Type': 'application/json',
            },
            data: message,
        });

        return result;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

module.exports = {
    sendNotice,
};

const API_URL = process.env.REACT_APP_API_URL;

const sendMessage = async (messageData) => {
    const response = await fetch(`${API_URL}/chat/send`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(messageData),
    });
    if (!response.ok) {
        throw new Error('Failed to send message');
    }
    return response.json();
};

const getMessages = async () => {
    const response = await fetch(`${API_URL}/chat/messages`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    if (!response.ok) {
        throw new Error('Failed to fetch messages');
    }
    return response.json();
};

export { sendMessage, getMessages }; 
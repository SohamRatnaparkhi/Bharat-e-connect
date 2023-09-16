const encrypt = (text) => {
    //aes-256-cbc
    const cipher = crypto.createCipheriv('aes-256-cbc', process.env.REACT_APP_SECRET_KEY, process.env.REACT_APP_IV);
    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return encrypted;
}
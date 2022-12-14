const MAILER = process.env.MAIL_MAILER
const HOST = process.env.MAIL_HOST
const PORT = process.env.MAIL_PORT
const USERNAME = process.env.MAIL_USERNAME
const PASSWORD = process.env.MAIL_PASSWORD
const ENCRYPTION = process.env.MAIL_ENCRYPTION
const FROM_ADDRESS = process.env.MAIL_FROM_ADDRESS
const FROM_NAME = process.env.MAIL_FROM_NAME

const htmlContent = (user, hashedEmail) => {
    return `<a href="${process.env.APP_FRONT_END_URL}/auth/verify?email=${user}&token=${hashedEmail}">Click here to verify</a> `
}

const htmlContentInviteGroup = (groupId, email, token) => {
    return `<a href="${process.env.APP_FRONT_END_URL}/group/${groupId}/invite?email=${email}&token=${token}">Click here to join group</a> `
}

module.exports = {
    MAILER,
    HOST,
    PORT,
    USERNAME,
    PASSWORD,
    ENCRYPTION,
    FROM_ADDRESS,
    FROM_NAME,
    htmlContent,
    htmlContentInviteGroup,
}

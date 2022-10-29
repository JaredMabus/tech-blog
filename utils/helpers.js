module.exports = {
    setActiveLink: (link) => {
        console.log(link)
        if (link === "/") {
            return "active"
        } else if (link === "dashboard") {
            return "active"
        } else if (link === "login") {
            return "active"
        } else {
            return ""
        }
    },
    formatDate: (date) => {
        return date.toLocaleDateString("en-US")
    }

};
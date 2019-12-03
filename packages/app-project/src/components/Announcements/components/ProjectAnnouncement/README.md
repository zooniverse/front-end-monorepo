# ProjectAnnouncement

Shows the project owner-defined announcement (`project.configuration.announcement`). This banner is dismissible: on clicking the close button, it saves a hash of the text string and saves it as a cookie. On fetching the page, the hash is compared to a hash of the current announcement string. If it matches, it's not rendered; if it doesn't match, it's shown to the user.

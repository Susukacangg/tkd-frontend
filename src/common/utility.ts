export function nameToColor(name: string | null): string {
    if (name !== null) {
        let color: string = "";

        if (name !== undefined) {
            let hash: number = 0;
            for (let i = 0; i < name.length; i++) {
                hash = name.charCodeAt(i) + ((hash << 6) - hash);
            }

            color = "#";

            for (let i = 0; i < 3; i++) {
                const value = (hash >> (i * 8)) & 0xff;
                color += `00${value.toString(16)}`.slice(-2)
            }
        }

        return color;
    }

    return "";
}

export function getAvatarDisplay(name: string | null) {
    let firstInitial, lastInitial, avatarImg = "";

    if(name !== null){
        const nameArray = name.split(' ');
        firstInitial = nameArray[0][0];
        lastInitial = nameArray.length > 1? nameArray[nameArray.length - 1][0] : "";
    } else {
        avatarImg = "/mt-avatar.jpg";
    }

    return {
        sx: {
            bgcolor: nameToColor(name),
        },
        children: `${firstInitial}${lastInitial}`,
        src: avatarImg,
    }
}
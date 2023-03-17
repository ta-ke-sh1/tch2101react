import axios from "axios";

const host = 'http://localhost:9000';

export async function handleReaction(event, reaction) {
    event.preventDefault();
    console.log("Reaction: " + reaction);
    await axios
        .get(host + `/reaction?document=${id}&user=${decodedToken.user
            }&reaction=${reaction ? 1 : -1}`
        )
        .then((res) => {
            console.log(res);
        });
    fetchReactions();
}

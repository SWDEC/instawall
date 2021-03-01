var hashtag = 'paxanders';
var url = 'https://www.instagram.com/explore/tags/' + hashtag + '/?__a=1';

class InstagramPost {
    constructor(node) {
        this.shortcode = node.shortcode
        this.description = node.edge_media_to_caption.edges[0].node.text;
        this.uploadDate = new Date(node.taken_at_timestamp * 1000);
        this.imageUrl = node.display_url;
        this.userId = node.owner.id;
    }
}

function scrollToTop() {
    window.scrollTo(0, 0);
}

function scrollToBottom() {
    window.scrollTo(0, document.body.scrollHeight);
}

var posts = [];

fetch(
    url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        }
    },
).then(r => r.json()).then(data => {
    var queryData = data;

    queryData.graphql.hashtag.edge_hashtag_to_media.edges.forEach(edge => {
        posts.push(new InstagramPost(edge.node));
    });
}).then(data => {
    var images = [];

    posts.forEach(post => {
        var img = document.createElement("img");
        img.src = post.imageUrl;
        images.push(img);
    });

    var counter = 1;

    var table = document.getElementById('images');
    var row3 = table.insertRow(0);
    row3.id = "row3";
    var row2 = table.insertRow(0);
    row3.id = "row2";
    var row1 = table.insertRow(0);
    row1.id = "row1";

    var cell1 = row1.insertCell(0);
    var cell2 = row1.insertCell(1);
    var cell3 = row1.insertCell(2);
    var cell4 = row2.insertCell(0);
    var cell5 = row2.insertCell(1);
    var cell6 = row2.insertCell(2);
    var cell7 = row3.insertCell(0);
    var cell8 = row3.insertCell(1);
    var cell9 = row3.insertCell(2);


    images.forEach(img => {
        if (counter == 1) cell1.appendChild(img);
        if (counter == 2) cell2.appendChild(img);
        if (counter == 3) cell3.appendChild(img);
        if (counter == 4) cell4.appendChild(img);
        if (counter == 5) cell5.appendChild(img);
        if (counter == 6) cell6.appendChild(img);
        if (counter == 7) cell7.appendChild(img);
        if (counter == 8) cell8.appendChild(img);
        if (counter == 9) cell9.appendChild(img);
        counter++;
    });
});
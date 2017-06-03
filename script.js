function getStreamers() {
    var streamerList = ["dandinh", "road_to_employable", "freecodecamp", "esl_sc2", "zotac_cup", "AdmiralBulldog"];
    var apiLink = 'https://api.twitch.tv/kraken/streams/'
    var backupApiLink = 'https://api.twitch.tv/kraken/users/'
    var clientID = '?client_id=dec759s30146ofnkouic7p8nboyovf'
    var offlineStreamers = [];
    var offlineStreamersUrl = [];
    var finished = 0;
    for (var i = 0; i < streamerList.length; i++) {
        streamerLink = apiLink + streamerList[i] + clientID;

        console.log(streamerLink);
        $.ajax({
            url: streamerLink,
            type: 'GET',
            async: false,
            dataType: 'json',
            contentType: 'application/json',
            success: function (data) {
                if (data.stream == null) {
                    offlineStreamers.push(streamerList[i])
                }
                if (data.stream.stream_type === "live") {
                    results = `<div class="card col-sm-12 streamer-list">
                                    <h3 class="card-header headline"><a href="${data.stream.channel.url}"><img src="${data.stream.channel.logo}" 
                                                                alt="${data.stream.channel.display_name} logo" class="custom-img" >
                                                                ${data.stream.channel.display_name}</a>
                                                                <img src="https://thumb-ovp.piksel.com/includes/images/LIVE.png" class="live" alt="live"></h3>
                                    <div class="card-block">
                                        <p class="card-text">${data.stream.channel.status}</p>
                                    </div>
                                </div>`
                    $("#streamList").append(results);
                    finsihed++;
                }
            }
        });
    }
    if (finished = streamerList.length) {
        for (var j = 0; j < offlineStreamers.length; j++) {
            backupStreamerLink = backupApiLink + offlineStreamers[j] + clientID;
            


            $.ajax({
                url: backupStreamerLink,
                type: 'GET',
                async: false,
                dataType: 'json',
                contentType: 'application/json',
                success: function (data) {
                    link = data.logo
                    channelName = data.display_name;

                    results = `<div class="card col-sm-12 streamer-list">
                                        <h3 class="card-header headline"><a href="https://www.twitch.tv/`+ channelName +`"><img src="` + link + `"${data.logo}" 
                                                                    alt="${data.display_name} logo" class="custom-img" >
                                                                    ${data.display_name}</a></h3>
                                        <div class="card-block">
                                            <p class="card-text">${data.bio}</p>
                                        </div>
                                    </div>`
                    $("#streamList").append(results);
                }

            });
        }
    }
}


$('document').ready(function () {

    getStreamers();



});

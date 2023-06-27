$(function () {
    var syncClient;
    var syncStream;
    var message = document.getElementById('message');
    var text_area = document.getElementById('text_area');
    var select_element = document.getElementById('select')
    var background_color;


    $.getJSON('/token', function(tokenResponse) {
        syncClient = new Twilio.Sync.Client(tokenResponse.token, { logLevel: 'info' });

        // create the stream object
        syncClient.stream('messageData').then(function(stream) {
            syncStream = stream;
            // listen update and sync drawing data
            syncStream.on('messagePublished', function(event) {
                console.log('syncStream:',event.message.value);
                syncDrawingData(event.message.value);


            });
        });
    });
    // Write the code here
    function syncDrawingData(data) {
        document.getElementById("text_area").value = data.textarea_value
        document.getElementById("text_area").style.backgroundColor = data.background_color
        if (data.background_color == "green"){
            document.getElementById("text_area").style.backgroundColor = "green"
        }
        if (data.background_color == "yellow"){
            document.getElementById("text_area").style.backgroundColor = "yellow"
        }
        if (data.background_color == "red"){
            document.getElementById("text_area").style.backgroundColor = "red"
        }
        if (data.background_color == "white"){
            document.getElementById("text_area").style.backgroundColor = "white"
        }

    }


    function messageSync()
{
	text = document.getElementById("text_area").value;

    setTimeout(function(){
        SettingSyncData()
        },
        1700);

}
    // Write the code here
    function SettingSyncData(){
    syncStream.publishMessage({ 
            textarea_color:background_color,
            textarea_value:text
        });
    }
    // Write the code here
    function select_color(){
     color_got = document.getElementById("select").value
     // background_color=color_got
     if (color_got == "green"){
            background_color = "green"
        }
        if (color_got == "yellow"){
            background_color= "yellow"
        }
        if (color_got == "red"){
            background_color= "red"
        }
        if (color_got == "white"){
           background_color= "white"
        }
    }
    // Write the code here
    text_area.addEventListener("keyup", messageSync) 
    select_element.addEventListener("change", select_color)

});

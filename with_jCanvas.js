bird_canvas_c = function(id, opacity){
    console.log("constructor of bird_canvas_c are called.");
    this.id_ = "#" + id;
    var circle = {
        strokeStyle: "#FFFFFF",
        strokeWidth: 1,
        fromCenter: false,
        radius: 115,
        layer: true,
    };
    var circle_environmental_light = $.extend(true, {}, circle);
    circle_environmental_light.fillStyle = "#FFFFFF";
    circle_environmental_light.name = "spotlight_env";
    var circle_direct_light = $.extend(true, {}, circle);
    circle_direct_light.fillStyle = "rgba(255, 255, 255, " + opacity + ")";
    circle_direct_light.name = "spotlight";

    $(this.id_).drawArc(circle_environmental_light).drawImage({
        source: 'http://s3.amazonaws.com/lyah/bird.png',
        layer: true,
        name: "backimg",
        fromCenter: false
    }).drawArc(circle_direct_light);
    this.layer_spotlinght_ = $(this.id_).getLayer("spotlight");
};
bird_canvas_c.prototype.draw = function(){
    console.log("function bird_canvas_c::draw are called.");
    this.layer_spotlinght_.visible = true;
    $(this.id_).drawLayers();
};
bird_canvas_c.prototype.hide = function(){
    console.log("function bird_canvas_c::hide are called.");
    this.layer_spotlinght_.visible = false;
    $(this.id_).drawLayers();
};

$(function(){
    var bird_canvas = new bird_canvas_c("bird_canvas", 0.5);
    bird_canvas.hide();//スポットライトは表示しない
    $("#dialog").dialog({
        autoOpen: false,
        modal: true,
        closeOnEscape: false,
        draggable: false,
        buttons: {
            "OK": function(){
                console.log("jQuery click OK event about #dialog are called.");
                $(this).dialog('close');
                bird_canvas.hide();
            }
        }
    });
    $("#OPEN_DIALOG").click(function(){
        console.log("jQuery click event about #OPEN_DIALOG are called.");
        $("#dialog").dialog('open');
        bird_canvas.draw();
    });
});
Object.size = function(obj) {
    var size = 0, key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) size++;
    }
    return size;
};

inlets = 1;
outlets = 4;

var buffers = {};
	
function initBuffer()
{
	var a = arrayfromargs(arguments);
	post("received list " + a + "\n");
	buffers[a[0]] = {
		"bufferName": a[1],
		"fileName": a[2],
		"length": a[3],
		"channels": a[4],
		"sampleRate": a[5],
		"start": 0.0,
		"end": 1.0,
		"pitch": 0.0
	};
	
	outlet(1, "initBuffer", a[0]);
	
}

function setStart()
{
	var a = arrayfromargs(arguments);
	var index = a[0];
	var touchOn = a[1];
	var position = a[2];

	
	buffers[index]["start"] = position;
	outlet(0, "target", index);
	outlet(0, "list", "start", position);
	
	outlet(1, "target", index);
	outlet(1, index, touchOn, position);
}

function setEnd()
{
	var a = arrayfromargs(arguments);
	var index = a[0];
	var touchOn = a[1];
	var position = a[2];
	
	buffers[index]["end"] = position;
	outlet(0, "target", index);
	outlet(0, "list", "end", position);
	
	outlet(2, "target", index);
	outlet(2, index, touchOn, position);
}

function setPitchModulation()
{
	var a = arrayfromargs(arguments);
	var index = a[0];
	var touchOn = a[1];
	var pitch = a[2];
	
	buffers[index]["pitch"] = pitch;
	outlet(0, "target", index);
	outlet(0, "list", "pitch", pitch);
	
	//outlet(2, "target", index);
	//outlet(2, index, touchOn, pitch);
}

function get()
{
	var a = arrayfromargs(arguments);
	outlet(0, buffers[a[0]][a[1]]);
}


function dump()
{
	outlet(1, "dump", Object.size(buffers));
}
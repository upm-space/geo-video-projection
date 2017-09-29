/*
    D3.js Slider
    Inspired by jQuery UI Slider
    Copyright (c) 2013, Bjorn Sandvik - http://blog.thematicmapping.org
    BSD license: http://opensource.org/licenses/BSD-3-Clause
*/

// Public variables width default settings
var min = 0;
var max = 100;
var step = 0.01;
var animate = true;
var margin = 50;
var active = 1;

var axisScale;
var dispatch = d3.dispatch("slide", "slideend");
var formatPercent = d3.format(".2%");
var handle1;
var handle2;
var divRange;
var sliderLength;

/*
var value = [ 0, 608399957];
var scale = d3.scaleLinear().domain( [ 0, 608399957 ] );
var axis = d3.axisTop(scale).ticks(10).tickFormat(function(d) { return usToHHMMSS(d) });
*/

// Find the nearest tick
function nearestTick(pos) {
    var ticks = scale.ticks ? scale.ticks() : scale.domain();
    var dist = ticks.map(function(d) {return pos - scale(d);});
    var i = -1;
    var index = 0;
    var r = scale.ticks ? scale.range()[1] : scale.rangeExtent()[1];
    do {
        i++;
        if (Math.abs(dist[i]) < r) {
            r = Math.abs(dist[i]);
            index = i;
        }
    } while (dist[i] > 0 && i < dist.length - 1);

    return ticks[index];
}

// Calculate nearest step value
function stepValue(val) {
    if (val === scale.domain()[0] || val === scale.domain()[1]) {
        return val;
    }

    var valModStep = (val - scale.domain()[0]) % step;
    var alignValue = val - valModStep;

    if (Math.abs(valModStep) * 2 >= step) {
        alignValue += (valModStep > 0) ? step : -step;
    }

    return alignValue;
}

// Move slider handle on click/drag
function moveHandle(newValue) {
    var currentValue = value[active - 1];
    var oldPos = formatPercent(scale(stepValue(currentValue)));
    var newPos = formatPercent(scale(stepValue(newValue)));
    var position = "left";

    if (oldPos !== newPos) {
        value[ active - 1 ] = newValue;
        if (d3.event) {
            // dispatch.slide(d3.event, value );
            return value;
        }

        if ( value[ 0 ] >= value[ 1 ] ) return;
        if ( active === 1 ) {
            divRange.style("left", newPos);

            if (animate) {
                handle1.transition()
                    .styleTween(position, function() { return d3.interpolate(oldPos, newPos); })
                    .duration((typeof animate === "number") ? animate : 250);
            } else {
                handle1.style(position, newPos);
            }
        } else {
            var width = 100 - parseFloat(newPos);

            divRange.style("right", width + "%");

            if (animate) {
                handle2.transition()
                    .styleTween(position, function() { return d3.interpolate(oldPos, newPos); })
                    .duration((typeof animate === "number") ? animate : 250);
            } else {
                handle2.style(position, newPos);
            }
        }
    }
}

function slider(dom) {
    // Start value
    // value = value || scale.domain()[0];

    // DIV container
    var div = d3.select(dom).classed("d3-slider d3-slider-horizontal", true);

    var drag = d3.drag();
    drag.on("drag.end", function () {
        // dispatch.slideend(d3.event, value);
        return value;
    });

    handle1 = div.append("a")
        .classed("d3-slider-handle", true)
        .attr("xlink:href", "#")
        .attr('id', "handle-one")
        .on("click", stopPropagation)
        .call(drag);
    handle2 = div.append("a")
        .classed("d3-slider-handle", true)
        .attr('id', "handle-two")
        .attr("xlink:href", "#")
        .on("click", stopPropagation)
        .call(drag);

    divRange = d3.select(dom).append('div').classed("d3-slider-range", true);

    handle1.style("left", formatPercent(scale(value[ 0 ])));
    divRange.style("left", formatPercent(scale(value[ 0 ])));
    drag.on("drag", onDragHorizontal);

    var width = 100 - parseFloat(formatPercent(scale(value[ 1 ])));
    handle2.style("left", formatPercent(scale(value[ 1 ])));
    divRange.style("right", width+"%");
    drag.on("drag", onDragHorizontal);

    sliderLength = parseInt(div.style("width"), 10);

    // Copy slider scale to move from percentages to pixels
    axisScale = scale.ticks ? scale.copy().range([0, sliderLength]) : scale.copy().rangePoints([0, sliderLength], 0.5);
    axis.scale(axisScale);

    // Create SVG axis container
    var svg = div.append("svg").classed("d3-slider-axis d3-slider-axis-top", true).on("click", stopPropagation);
    var g = svg.append("g");
    svg.style("margin-left", -margin + "px");
    svg.attr({
        width: sliderLength + margin * 2,
        height: margin
    });
    svg.style("top", -margin + "px");
    g.attr("transform", "translate(" + margin + "," + margin + ")");
    g.call(axis);

    function onDragHorizontal() {
        if ( d3.event.sourceEvent.target.id === "handle-one") {
            active = 1;
        } else if ( d3.event.sourceEvent.target.id == "handle-two" ) {
            active = 2;
        }
        var pos = Math.max(0, Math.min(sliderLength, d3.event.x));
        moveHandle(stepValue(scale.invert(pos / sliderLength)));
    }

    function stopPropagation() {
        d3.event.stopPropagation();
    }
}

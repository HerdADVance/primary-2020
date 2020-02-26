
$("path, circle").hover(function(e) {
  $('.votes-hover').css('display','block');
  $('.votes-hover').html($(this).data('info'));
});

$("path, circle").mouseleave(function(e) {
  $('.votes-hover').css('display','none');
});

$(document).mousemove(function(e) {
  $('.votes-hover').css('top',e.pageY-$('.votes-hover').height()-30);
  $('.votes-hover').css('left',e.pageX-($('.votes-hover').width())/2);
}).mouseover();

// var ios = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
// if(ios) {
//   $('a').on('click touchend', function() {
//     var link = $(this).attr('href');
//     window.open(link,'_blank');
//     return false;
//   });
// }

var candidates = [

    {
        id: 1,
        name: "Bernie Sanders",
        delegates: 0,
    },
    {
        id: 2,
        name: "Pete Buttigieg",
        delegates: 0,
    },
    {
        id: 3,
        name: "Joe Biden",
        delegates: 0,
    },
    {
        id: 4,
        name: "Elizabeth Warren",
        delegates: 0,
    },
    {
        id: 5,
        name: "Amy Klobuchar",
        delegates: 0,
    }

];

_.forEach(stateData, function(state, key){

    // Color Map    
    var sortedVotes = _.orderBy(state.votes, ['delegates'], ['desc']);
    $('#' + key).addClass("c" + sortedVotes[0].id);

    var counter = 0;
    var output = '<strong>' + state.name + '</strong>';
    output += '<table class="votes">';
        output += '<tr>';
            output += '<th>Name</th>';
            output += '<th>Votes</th>';
            output += '<th>Delegates</th>';
        output += '</tr>';

    // Loop for each state    
    _.forEach(state.votes, function(candidate){
        
        // Color Map and Count Delegates
        var foundIndex = candidates.findIndex(x => x.id == candidate.id)
        if(foundIndex > -1){
            candidates[foundIndex].delegates += candidate.delegates;
        }

        // Print tooltip table
        if(counter < 5){
            output += '<tr>'
                output += '<td>' + candidate.name + '</td>'
                output += '<td>' + candidate.finalVote + '</td>'
                output += '<td>' + candidate.delegates + '</td>'
            output += '</tr>';
        }

        counter ++
    })
    output += '</table>'

    $('#' + key).attr('data-info', output);

});

var needed = 1991;
var output = '<table>'
_.forEach(candidates, function(c){
    var barWidth = c.delegates/1991 * 100;
    output += '<tr>';
        output += '<td class="name">' + c.name + '</td>';
        output += '<td class="bar"><span class="bar-color c' + c.id + '" style="width:' + barWidth + '%;">' + c.delegates + '</span></td>';
    output += '</tr>';
});
output += '</table>';

$('.delegates').html(output);











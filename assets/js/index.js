
$("path, circle").hover(function(e) {
  $('.votes-hover').css('display','block');
  $('.votes-hover').html($(this).data('info'));
});

$("path, circle").mouseleave(function(e) {
  $('.votes-hover').css('display','none');
});

$(document).mousemove(function(e) {
  $('.votes-hover').css('top',e.pageY-$('.votes-hover').height()+80);
  $('.votes-hover').css('left',e.pageX-($('.votes-hover').width())-30);
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
    },
    {
        id: 6,
        name: "Andrew Yang",
        delegates: 0,
    },
    {
        id: 7,
        name: "Tom Steyer",
        delegates: 0,
    }

];

_.forEach(stateData, function(state, key){

    // Color Map    
    var sortedVotes = _.orderBy(state.votes, ['delegates'], ['desc']);
    $('#' + key).addClass("c" + sortedVotes[0].id);

    var counter = 0;
    
    // Start output for each state's hover info
    var output = '<strong>' + state.name + '</strong>';
    output += '<span class="caucus">';
        if(state.caucus) output += 'Caucus';
        else output += 'Primary';
    output += '</span>';
    output += '<table class="votes">';
        output += '<tr>';
            output += '<th>Name</th>';
            output += '<th>Votes</th>';
            output += '<th>Delegates</th>';
        output += '</tr>';

    // Loop for each Candidate in State   
    _.forEach(state.votes, function(candidate){
        
        // Color in state and count delegates
        var foundIndex = candidates.findIndex(x => x.id == candidate.id)
        if(foundIndex > -1){
            candidates[foundIndex].delegates += candidate.delegates;
        }

        // Print state's hover info table
        if(counter < 5){
            output += '<tr>'
                output += '<td>' + candidates[foundIndex].name + '</td>'
                output += '<td>' + candidate.finalVote + '</td>'
                output += '<td>' + candidate.delegates + '</td>'
            output += '</tr>';
        }

        counter ++
    })
    output += '</table>'

    $('#' + key).attr('data-info', output);

});

// Output total delegate counter
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











$('.answer').click(function () {
    const data = $(this).attr('id').split('-')
    $.ajax({
        data: JSON.stringify({question: data[1], answer: data[2]}),
        dataType: 'json',
        method: 'POST',
        contentType: 'application/json',
        accepts: {
            'text': 'application/json'
        },
        success: function (d) {
            console.log(d)
        },
        error: function (d) {
            console.error(d)
        }
    })
})
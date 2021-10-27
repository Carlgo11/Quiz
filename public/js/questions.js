$('.answer').click(function (e) {
    const data = $(this).attr('id').split('-')
    console.log(data[1])
    console.log(data[2])
    $.ajax({
        url: '',
        data: JSON.stringify({question: data[1], answer: data[2]}),
        dataType: "json",
        method: "POST",
        contentType: 'application/json',
        accepts: {
            "text": "application/json"
        },
        success: function (d) {
            console.log(d)
        },
        error: function (d) {
            console.error(d)
        }
    })
})
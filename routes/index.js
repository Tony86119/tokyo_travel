var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var fs=require('fs');
router.use(bodyParser.urlencoded({ extended: true }));
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


/* GET home page. */
router.get('/get_item_list', function(req, res, next) {
  
//get json
let rawdata = fs.readFileSync('./public/data/buylist.json');
var data=JSON.parse(rawdata);
for(var i=0;i<data.length;i++){
  data[i].function = "<button  id ='" + i + "' type=\"button\" class=\"btn btn-danger \"  onclick=\"delete_item(this.id)\" >刪除</button>";
}
   res.send(data);
});

router.post('/add_item', function(req, res, next) {
  var item=req.body.shopping_item;
  let rawdata = fs.readFileSync('./public/data/buylist.json');
  var data=JSON.parse(rawdata);
  var obj= {};
  obj.Title=item
  data.push(obj);
  console.log(data);
  fs.writeFile('./public/data/buylist.json', JSON.stringify(data), function(err) {
    if (err) throw err;
    console.log('file saved');
    res.redirect('/');
  });
});

router.post('/delete_item/:id', function(req, res, next) {
  var id = req.params.id;

  let rawdata = fs.readFileSync('./public/data/buylist.json');
  var data=JSON.parse(rawdata);
  data.splice(id,1);

  fs.writeFile('./public/data/buylist.json', JSON.stringify(data), function(err) {
    if (err) throw err;
    console.log('file saved');
    res.redirect('/');
  });
});



module.exports = router;

var smile_id = ['003020E3', '003120E3', '003220E3',
    '003320E3', '003420E3', '003520E3', '003620E3',
    '003720E3', '003820E3', '003920E3',
    '270D', 'D83DDC41', 'D83DDDE3', 'D83DDD75', '26D1',
    'D83DDC78D83CDFFF', 'D83DDC82D83CDFFF', 'D83CDFAE', 'D83CDF59',
    'D83CDF58', 'D83DDD30', 'D83EDD81', 'D83EDD84', 'D83DDD77',
    'D83EDD82', 'D83EDD80', 'D83DDD4A', 'D83EDD83', 'D83DDC3F',
    'D83DDD78', 'D83DDD70', 'D83DDD29',
    '2604', '26C8', '2603', '26F9', '26E9', '23F1', '23F2',
    '231B', '26D3', '2692', '2699', '2696', '26CF', '2697',
    'D83CDF26', 'D83CDF25', 'D83CDF27', 'D83DDC29',
    'D83EDD13', 'D83DDE43', 'D83DDE42',
    'D83EDD11', 'D83EDD17', 'D83DDE44', 'D83EDD14',
    'D83EDD10', 'D83EDD15', 'D83EDD12', 'D83EDD16',
    'D83DDD95', 'D83DDD90', 'D83EDD18', 'D83DDD96',
    'D83CDF2A', 'D83CDF2B',  'D83CDF2C', 'D83CDF36', 'D83EDDC0',
    'D83CDF2F', 'D83CDF2E', 'D83CDF2D', 'D83CDF7F', 'D83CDF7E',
    'D83CDF7D', 'D83CDFD3', 'D83CDFD0', 'D83CDFCC', 'D83CDFF8',
    'D83CDFD2', 'D83CDFD1', 'D83CDFCB',  'D83DDD74',
    'D83CDF97', 'D83CDFC5', 'D83CDF96', 'D83CDF9F', 'D83CDFF9',
    'D83CDFF5', 'D83CDFCE', 'D83CDFCD', 'D83DDEA1', 'D83DDEEC',
    'D83DDEEB', 'D83DDEE9', 'D83DDEE5', 'D83DDEF0', '26F0',
    'D83CDFD4', 'D83CDFDE', 'D83CDFD5', 'D83DDEE3', 'D83DDEE4',
    'D83CDFDD', 'D83CDFD6', 'D83CDFDC', 'D83CDFD9', 'D83CDFDF',
    'D83CDFD8', 'D83DDD4C', 'D83DDD4D', 'D83DDD4B',
    'D83DDE4FD83CDFFF', 'D83DDC4AD83CDFFF', 'D83DDC47D83CDFFF',
    'D83DDC4DD83CDFFF', 'D83DDC4CD83CDFFF', 'D83DDCAAD83CDFFF',
    'D83DDC4AD83CDFFF', 'D83DDC42D83CDFFF', 'D83DDD96D83CDFFF',
    'D83DDC67D83CDFFF', 'D83CDF85D83CDFFF', 'D83DDC71D83CDFFF',
    'D83DDC72D83CDFFF', 'D83DDC73D83CDFFF', 'D83DDC74D83CDFFF',
    'D83DDC75D83CDFFF', 'D83DDC6ED83CDFFF', 'D83DDC77D83CDFFF',
    '2328', 'D83DDD79', 'D83DDCBB', 'D83DDDB2', 'D83DDDB1',
    'D83DDDDC', 'D83DDCFD', 'D83CDF9E', 'D83CDF99', 'D83CDF9A',
    'D83CDF9B',  'D83DDDD1', 'D83DDD6F', 'D83DDEE2',
    '2620', 'D83DDCFF', 'D83DDEE1', '2694', 'D83DDDE1', '26B0', '26B1',
    'D83CDFFA','D83DDD2C', 'D83DDD2D', 'D83CDF21', 'D83CDFF7',
    'D83DDD73', 'D83DDECB', 'D83DDDBC', 'D83DDECC', 'D83DDDFA', 'D83DDECF',
    '26F1', 'D83DDECD', 'D83DDECE', 'D83DDDF3', 'D83DDDC3', 'D83DDDC4',
    'D83DDDD2', 'D83DDDDE', 'D83DDD87', 'D83DDCCE', 'D83CDFF3', 'D83DDD8C',
    'D83DDD8D', 'D83DDD8A', '2763', 'D83DDD49', '2638', '262A', 'D83DDD4E',
    '2721', '262F', '2626', '271D', '2622', '2623', 'D83DDDEF', 'D83DDCAD',
    '26AB', '26AA', 'D83DDD35', 'D83DDD34', '2705', '274E',
    '2753', '2757', '203C', '2049', '2B50', 'D83DDC7E'
];


var off_smiles = {};

var to_off_smiles = localStorage.getItem("moresmiles_off_smiles");
if (to_off_smiles) off_smiles = JSON.parse(to_off_smiles);

var actions = {
    'smilesGet': smilesGet,
    'offSet': offSet,
    'optsOpen': optsOpen
};

chrome['runtime']['onMessage'].addListener(function (data, sender, sendResponse) {
    console.log('onMessage: ', data);
    if (actions[data.cmd]) actions[data.cmd](data, sender, sendResponse);
});
chrome['runtime']['onMessageExternal'].addListener(function (data, sender, sendResponse) {
    console.log('onMessage: ', data);
    if (actions[data.cmd]) actions[data.cmd](data, sender, sendResponse);
});


function optsOpen(data, sender, sendResponse) {
    open('pages/options.html');
}

function smilesGet(data, sender, sendResponse) {
    sendResponse({
        smiles: smile_id,
        off: off_smiles
    });
}

function offSet(data, sender, sendResponse) {
    off_smiles = data.off;
    localStorage.setItem("moresmiles_off_smiles", JSON.stringify(off_smiles));
}
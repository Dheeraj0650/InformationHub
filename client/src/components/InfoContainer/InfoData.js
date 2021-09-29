import languages from './languages';
import {namesList} from './movies/language';
import {regionNamesList} from './region';

var sidebarMenuArray = [
  { name:'Weather',
    description:'get the information about weather',
  },
  { name:'Movies',
    description:'get the information about Movies'
  },
  { name:'Realtimetext',
    description:'get the Realtime text data'
  },
  { name:'Nasa',
    description:'get the information about Nasa'
  },
  { name:'Food',
    description:'get the information about Food'
  },
  { name:'Food',
    description:'get the information about Food'
  },
  { name:'Food',
    description:'get the information about Food'
  },
  { name:'Food',
    description:'get the information about Food'
  },
  { name:'Food',
    description:'get the information about Food'
  },
  { name:'Food',
    description:'get the information about Food'
  },
];

var method_1 = [
  {
    type:"InputField",
    name:"latitude",
    required:true
  },
  {
    type:"InputField",
    name:"longitude",
    required:true
  },
  {
    type:"Dropdown",
    name:"exclude",
    description:"exclude some parts of the weather data from the API response",
    content:{'current':'current','minutely':'minutely','hourly':'hourly','daily':'daily','alerts':'alerts'}
  },
  {
    type:"Dropdown",
    name:"units",
    description:"Units of measurement",
    content:{'imperial':'temperature in Fahrenheit and wind speed in miles/hour','metric':'temperature in Celsius and wind speed in meter/sec','standard':'temperature in Kelvin and wind speed in meter/sec'}
  },
  {
    type:"Dropdown",
    name:"language",
    description:"You can use the lang parameter to get the output in your language",
    content:languages
  }
];

var method_2 = [
  [
    {
      type:"InputField",
      name:"city",
      required:true
    },
    {
      type:"Dropdown",
      name:"units",
      description:"Units of measurement",
      content:{'imperial':'temperature in Fahrenheit and wind speed in miles/hour','metric':'temperature in Celsius and wind speed in meter/sec','standard':'temperature in Kelvin and wind speed in meter/sec'}
    },
    {
      type:"Dropdown",
      name:"language",
      description:"You can use the lang parameter to get the output in your language",
      content:languages
    }
  ],

  [
    {
      type:"InputField",
      name:"id",
      required:true,
      description:'City ID. List of city ID "city.list.json.gz" can be downloaded here. http://bulk.openweathermap.org/sample/'
    },
    {
      type:"Dropdown",
      name:"units",
      description:"Units of measurement",
      content:{'imperial':'temperature in Fahrenheit and wind speed in miles/hour','metric':'temperature in Celsius and wind speed in meter/sec','standard':'temperature in Kelvin and wind speed in meter/sec'}
    },
    {
      type:"Dropdown",
      name:"language",
      description:"You can use the lang parameter to get the output in your language",
      content:languages
    }
  ],

  [
    {
      type:"InputField",
      name:"latitude",
      required:true
    },
    {
      type:"InputField",
      name:"longitude",
      required:true
    },
    {
      type:"Dropdown",
      name:"units",
      description:"Units of measurement",
      content:{'imperial':'temperature in Fahrenheit and wind speed in miles/hour','metric':'temperature in Celsius and wind speed in meter/sec','standard':'temperature in Kelvin and wind speed in meter/sec'}
    },
    {
      type:"Dropdown",
      name:"language",
      description:"You can use the lang parameter to get the output in your language",
      content:languages
    }
  ],

  [
    {
      type:"InputField",
      name:"zip",
      required:true
    },
    {
      type:"Dropdown",
      name:"units",
      description:"Units of measurement",
      content:{'imperial':'temperature in Fahrenheit and wind speed in miles/hour','metric':'temperature in Celsius and wind speed in meter/sec','standard':'temperature in Kelvin and wind speed in meter/sec'}
    },
    {
      type:"Dropdown",
      name:"language",
      description:"You can use the lang parameter to get the output in your language",
      content:languages
    }
  ],

  [
    {
      type:"InputField",
      name:"bbox",
      description:"Bounding box [lon-left,lat-bottom,lon-right,lat-top,zoom] Ex:- bbox = 12,32,15,37,10",
      required:true
    },
    {
      type:"Dropdown",
      name:"units",
      description:"Units of measurement",
      content:{'imperial':'temperature in Fahrenheit and wind speed in miles/hour','metric':'temperature in Celsius and wind speed in meter/sec','standard':'temperature in Kelvin and wind speed in meter/sec'}
    },
    {
      type:"Dropdown",
      name:"language",
      description:"You can use the lang parameter to get the output in your language",
      content:languages
    }
  ],

  [
    {
      type:"InputField",
      name:"latitude",
      required:true
    },
    {
      type:"InputField",
      name:"longitude",
      required:true
    },
    {
      type:"InputField",
      name:"count",
      description:"Number of cities around the point. The default number of cities is 5, the maximum is 50."
    },
    {
      type:"Dropdown",
      name:"units",
      description:"Units of measurement",
      content:{'imperial':'temperature in Fahrenheit and wind speed in miles/hour','metric':'temperature in Celsius and wind speed in meter/sec','standard':'temperature in Kelvin and wind speed in meter/sec'}
    },
    {
      type:"Dropdown",
      name:"language",
      description:"You can use the lang parameter to get the output in your language",
      content:languages
    }
  ],
];

var method_3 = [
  [
    {
      type:'InputField',
      name:'latitude',
      required:true
    },
    {
      type:'InputField',
      name:'longitude',
      required:true
    },
  ],

  [
    {
      type:'InputField',
      name:'latitude',
      required:true
    },
    {
      type:'InputField',
      name:'longitude',
      required:true
    },
    {
      type:'InputField',
      name:'start',
      description:'Start date'
    },
    {
      type:'InputField',
      name:'end',
      description:'End date'
    }
  ]
]

var method_4 = [
  [
    {
      type:'InputField',
      name:'q',
      required:true
    },
    {
      type:'InputField',
      name:'limit'
    }
  ],
  [
    {
      type:'InputField',
      name:'zip'
    },
  ]
]

var movies = [
    {
      type:'InputField',
      name:'name',
      required:true
    },
    {
      type:'InputField',
      name:'year'
    },
    {
      type:'Dropdown',
      name:'region',
      content:regionNamesList
    },
    {
      type:'Dropdown',
      name:'language',
      content:namesList
    }
]

var people = [
    {
      type:'InputField',
      name:'name',
      required:true
    },
    {
      type:'Dropdown',
      name:'region',
      content:regionNamesList
    },
    {
      type:'Dropdown',
      name:'language',
      content:namesList
    }
]

export {sidebarMenuArray, method_1, method_2,method_3,method_4,movies,people};

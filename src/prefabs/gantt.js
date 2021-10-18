(() => ({
  name: 'Gantt',
  icon: 'DataTable',
  category: 'DATA',

  structure: [
    {
      name: 'Gantt',
      options: [
        {
          type: 'TOGGLE',
          label: 'Toggle visibility',
          key: 'visible',
          value: true,
          configuration: {
            as: 'VISIBILITY',
          },
        },
        {
          value: '',
          label: 'Model',
          key: 'model',
          type: 'MODEL',
        },
        // {
        //   value: {},
        //   label: 'Filter',
        //   key: 'filter',
        //   type: 'FILTER',
        //   configuration: {
        //     dependsOn: 'model',
        //   },
        // },
        {
          value: '',
          label: 'Name',
          key: 'property',
          type: 'PROPERTY',
        },
        {
          value: '',
          label: 'Start Date',
          key: 'propertyDate',
          type: 'PROPERTY',
        },
        {
          value: '',
          label: 'End Date',
          key: 'propertyEndDate',
          type: 'PROPERTY',
        },
        {
          type: 'VARIABLE',
          label: 'Project names',
          key: 'content',
          value: ['Empty'],
        },
        {
          label: 'Add credits',
          key: 'credits',
          value: false,
          type: 'TOGGLE',
        },
        {
          type: 'VARIABLE',
          label: 'Credits',
          key: 'creditsText',
          value: [''],
          configuration: {
            condition: {
              type: 'SHOW',
              option: 'credits',
              comparator: 'EQ',
              value: true,
            },
          },
        },
        {
          value: 'left',
          label: 'Alignment Credits',
          key: 'aligment',
          type: 'CUSTOM',
          configuration: {
            as: 'BUTTONGROUP',
            dataType: 'string',
            allowedInput: [
              { name: 'Left', value: 'left' },
              { name: 'Center', value: 'center' },
              { name: 'Right', value: 'right' },
            ],
            condition: {
              type: 'SHOW',
              option: 'credits',
              comparator: 'EQ',
              value: true,
            },
          },
        },
        {
          type: 'VARIABLE',
          label: 'Caption',
          key: 'caption',
          value: [''],
        },
        {
          value: 'left',
          label: 'Alignment Caption',
          key: 'aligmentcaption',
          type: 'CUSTOM',
          configuration: {
            as: 'BUTTONGROUP',
            dataType: 'string',
            allowedInput: [
              { name: 'Left', value: 'left' },
              { name: 'Center', value: 'center' },
              { name: 'Right', value: 'right' },
            ],
          },
        },
        {
          label: 'Add Styling',
          key: 'addStyling',
          value: false,
          type: 'TOGGLE',
        },
        {
          type: 'COLOR',
          label: 'Gantt Fill',
          key: 'ganttfill',
          value: 'White',
          configuration: {
            condition: {
              type: 'SHOW',
              option: 'addStyling',
              comparator: 'EQ',
              value: true,
            },
          },
        },
        {
          type: 'COLOR',
          label: 'Color yAxis',
          key: 'coloryAxis',
          value: 'White',
          configuration: {
            condition: {
              type: 'SHOW',
              option: 'addStyling',
              comparator: 'EQ',
              value: true,
            },
          },
        },
      ],
      descendants: [],
    },
  ],
}))();

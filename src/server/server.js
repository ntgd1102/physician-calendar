const express = require('express');
var cors = require('cors');
const app = express();
const port = 3030;

app.use(cors());



app.get('/physicians', (req, res) => {
  res.json([
    {
      id: 1,
      firstName: 'Julius',
      lastName: 'Hibbert',
      email: 'hibbert@notablehealth.com'
    },
    {
      id: 2,
      firstName: 'Algernop',
      lastName: 'Krieger',
      email: 'krieger@notablehealth.com'
    },
    {
      id: 3,
      firstName: 'Nick',
      lastName: 'Riviera',
      email: 'riviera@notablehealth.com'
    },
  ]);
});

app.get('/physicians/:id', (req, res) => {
    switch (req.params.id) {
        case '1':
          res.json(
            [
              {
                id: 1,
                physicianId: 1,
                time: '2022-5-27T03:24:00',
                patientName: 'Amber',
                kind: 'New Patient'
              },
              {
                id: 2,
                physicianId: 1,
                time: '2022-5-27T09:24:00',
                patientName: 'Jamie',
                kind: 'Follow-Up'
              },
            ]
        );
          break;
        case '2':
          res.json(
            [
                {
                    id: 3,
                    physicianId: 2,
                    time: '2022-5-27T03:24:00',
                    patientName: 'David',
                    kind: 'Follow-Up'
                  },
                  {
                    id: 4,
                    physicianId: 2,
                    time: '2022-5-27T10:24:00',
                    patientName: 'Mike',
                    kind: 'New Patient'
                  },
            ]
          );
          break;
          case '3':
            res.json(
                [
            {
                    id: 5,
                    physicianId: 3,
                    time: '2022-5-27T05:24:00',
                    patientName: 'Viky',
                    kind: 'New Patient'
                  },
                  {
                    id: 6,
                    physicianId: 3,
                    time: '2022-5-27T12:24:00',
                    patientName: 'James',
                    kind: 'Follow-Up'
                  },
              ]
            );
            break;  
        default:
          res.json({ data: `Could not find any results for ${req.params.id}` });
      }
  
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

import React, { useEffect, useState } from 'react';

import {
  Box,
  MenuList,
} from '@mui/material';

import './App.css';
import { Calendar, Physician } from './type';

function PhysicianList ({ physicians, onPhysicianClick } : { physicians: Physician[]; onPhysicianClick?: (id: string) => void }) {
  function PhysicianItem({ physician, onPhysicianClick } : {
    physician: Physician;
    onPhysicianClick?: (id: string) => void;
  }) {
    
    function handleClick(physicianId: string) {
      onPhysicianClick && onPhysicianClick(physicianId);
    }

    return (
      <div
        key={physician.id}
        onClick={() => handleClick(physician.id)}
        style={{ display: 'flex '}}
      >
        <Box> 
          {`${physician.lastName},${physician.firstName}`}
        </Box>
      </div>
    );
  }
  return (
    <MenuList sx={{ width: '170px' }}>
      {physicians.map((physician) => (
        <PhysicianItem physician={physician} onPhysicianClick={onPhysicianClick} />
      ))}
    </MenuList>
  );
}

function PhysicianCalendar ({ selectedPhysicianId }: { selectedPhysicianId?: string }) {
  const [calendars, setCalendars] = useState<Calendar[] | undefined>(undefined);


  useEffect(() => {
    async function getPhysicianCalendar() {
      const res = await fetch(
        `http://localhost:3030/physicians/${selectedPhysicianId}`
      );
      const results = (await res.json());
      if (Array.isArray(results)) {
        setCalendars(results);
      } else {
        console.log('errorResult', results)
      }        
    }
    if (selectedPhysicianId) {
      getPhysicianCalendar();
    }
  }, [selectedPhysicianId]);

  if (!calendars) {
    return (
      <div>
        No id selected or No event for the selected physician
      </div>
    )
  }


  return (
      <ol>
        {calendars.map(calendar => {
        return (
          <li >{`${calendar.patientName} ${calendar.time} ${calendar.kind}`} </li>
        )})}
      </ol>
  );
}


function App() {

  const [ physicians, setPhysician ] = useState<Physician[] | undefined>(undefined);
  const [selectedPhysicianId, setSelectedPhysicianId] = useState<string | undefined>(undefined);

  useEffect(() => {
    async function getPhysicians() {
      const res = await fetch('http://localhost:3030/physicians');
      const physiciansData = await res.json();
      setPhysician(physiciansData);
    }
    getPhysicians();
  }, [])

  function onPhysicianClick(physicianId: string) {
    setSelectedPhysicianId(physicianId);
  }

  return (
    <Box sx={{ display: 'flex', height: '100%' }}>
      {physicians && physicians?.length && (
        <>
          <PhysicianList physicians={physicians} onPhysicianClick={onPhysicianClick}/>
          <PhysicianCalendar selectedPhysicianId={selectedPhysicianId}/>
        </>
      )}
    </Box>
  );
}

export default App;

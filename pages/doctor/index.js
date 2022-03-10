import { useState, useEffect } from "react";
import useAsync from "../../hooks/useAsync";
import axios from "../../network/axios";
import { useRouter } from "next/router";
const Doctor = () => {
  const [code, setCode] = useState("McKmpfNhAm");
  const router = useRouter();
  const [record, setRecord] = useState(null);
  const { data, loading, execute, error } = useAsync(
    { execOnStart: false },
    null
  );
  const {
    data: newRecData,
    loading: saveLoading,
    execute: executeSave,
  } = useAsync({ execOnStart: false }, null);
  const {
    data: closeRes,
    loading: closeLoading,
    execute: executeClose,
  } = useAsync({ execOnStart: false }, null);

  const [newRec, setNewRec] = useState(0);
  useEffect(() => {
    if (closeRes?.data) {
      setRecord(null);
    }
  }, [closeRes]);
  useEffect(() => {
    console.log(record);
  }, [record]);
  useEffect(() => {
    if (!data) return;
    if (data.data) {
      //   router.push("/doctor/session");
      setRecord(data.data);
    } else if (data.error) {
      alert("invalid code");
    }
  }, [data]);
  useEffect(() => {
    if (error) {
      alert("invalid code");
    }
  }, [error]);
  useEffect(() => {
    console.log(newRecData?.data);
    if (newRecData?.data) setRecord(newRecData.data.record);
  }, [newRecData]);
  return (
    <>
      <label htmlFor="shortId">Enter Code : </label>
      <input
        id="shortId"
        type="text"
        value={code}
        onChange={(e) => setCode(e.target.value)}
      />
      <button
        disabled={loading}
        onClick={() => {
          execute(() => axios.get(`record/getFromLink/${code}`));
        }}
      >
        Get patieent records
      </button>
      {record ? (
        <div className="bg-red-400">
          {record.recordData.length === 0 && "0 records found"}
          {record.recordData.map((r, i) => (
            <h1 key={i}>{r}</h1>
          ))}
        </div>
      ) : null}
      <div>
        <label htmlFor="newRec">Add new</label>
        <input
          className="border-2"
          type="number"
          value={newRec}
          onChange={(e) => setNewRec(e.target.value)}
        />
      </div>
      <button
        onClick={() =>
          executeSave(() =>
            axios.put(`record/update`, {
              shortId: code,
              newData: newRec,
            })
          )
        }
        disabled={saveLoading}
      >
        Save rec
      </button>
      <button
        onClick={() => executeClose(() => axios.delete(`record/link/${code}`))}
        disabled={closeLoading}
      >
        Close session
      </button>
    </>
  );
};

export default Doctor;

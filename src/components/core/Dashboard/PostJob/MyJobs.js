import { useEffect, useState } from "react"
import { VscAdd } from "react-icons/vsc"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

import { getAllJobs } from "../../../../services/operations/jobPostAPI"
import IconBtn from "../../../common/IconBtn"

import JobsTable from "./JobsTable"

export default function AddJobs() {
  const { token } = useSelector((state) => state.auth)
  const navigate = useNavigate()
  const [jobs, setJobs] = useState([])

  useEffect(() => {
    const fetchJobs = async () => {
      const result = await getAllJobs(token)
      console.log("result : ",result);
      if (result) {
        setJobs(result)
      }
    }
    fetchJobs()
    // eslint-disable-next-line react-hooks/exhaustive-deps
}, [])

  return (
    <div>
      <div className="mb-14 flex items-center justify-between">
        <h1 className="text-3xl font-medium text-richblack-5">My Jobs</h1>
        <IconBtn
          text="Add Job Post"
          onclick={() => navigate("/dashboard/post-job")}
        >
          <VscAdd />
        </IconBtn>
      </div>

      {jobs && <JobsTable jobs={jobs} setJobs={setJobs} />}
    </div>
  )
}

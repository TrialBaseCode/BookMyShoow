import { useEffect, useState } from "react";
import { getSinglemovies } from "../../api/movies";
import { Input, message } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { CalendarOutlined } from "@ant-design/icons";

import moment from "moment";

function SingleMovie() {
  const [movie, setMovie] = useState(null);
  const navigate = useNavigate();
  const params = useParams();
  const [date, setDate] = useState(moment().format("YYYY-MM-DD"));

  const handleDate = (e) => {
    // console.log(e.target.value);
    console.log(window.location.search);
    setDate(e.target.value);
  };

  const fetchMovie = async () => {
    try {
      const response = await getSinglemovies(params.id);

      if (response.success) {
        setMovie(response.data);
      } else {
        message.error(response.message);
      }
    } catch (error) {
      message.error(error.message);
    }
  };

  useEffect(() => {
    fetchMovie();
  }, []);

  return (
    <>
      <div>
        {movie ? (
          <>
            {/* making simple movie card */}
            <h1>{movie.title}</h1>
            {/* <img src={movie.poster} alt={movie.title} /> */}
            <p>{movie.genre}</p>
            <p>{movie.duration}</p>
            <p>{movie.descripton}</p>
            <hr />
            <div className="choosedate">
              <label htmlFor={date}>Choose the date</label>
              <Input
                onChange={handleDate}
                type="date"
                style={{ width: "200px" }}
                value={date}
                placeholder="default size"
              />
            </div>

            {/* Add more movie details as needed */}
          </>
        ) : (
          <p>Loading...</p> // Show a loading message while fetching the movie
        )}
      </div>
    </>
  );
}

export default SingleMovie;

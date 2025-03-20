import React, { useState, useEffect, useContext, useRef } from "react";
import "./Dashboard.css";
import search from "../../assets/search.svg";
import KeywordTable from "../home/KeywordTable";
import SearchList from "./SearchList";
import { AuthContext } from '../../contexts/AuthContext';
import { auth, db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';
import Tooltip from '../Tooltip';
import { Doughnut } from "react-chartjs-2";
import icon_angle_down from '../../assets/angle-down.svg'


const refreshUserData = async (login) => {
  const user = auth.currentUser;
  if (user) {
    try {
      const userDoc = await getDoc(doc(db, "users", user.uid));
      if (userDoc.exists()) {
        const userData = userDoc.data();
        login({ username: userData.displayName, Subscription: userData.Subscription, userIdentifier: userData.userIdentifier, UID: user.uid });
      }
    } catch (error) {
      setError(error.message || "Unable to fetch data, please try again later");
    }
  }
};

function Dashboard() {
  const {Subscription} = useContext(AuthContext);
  const [keyword, setKeyword] = useState("");
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { login, UID } = useContext(AuthContext);
  const [refreshSearchList, setRefreshSearchList] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [exactSearch, setExactSearch] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [entriesInput, setEntriesInput] = useState(10);
  const debounceTimeoutRef = useRef(null);

  const countries = [
    { code: 2012, name: "Algeria", icon: "dz" },
    { code: 2024, name: "Angola", icon: "ao" },
    { code: 2031, name: "Azerbaijan", icon: "az" },
    { code: 2032, name: "Argentina", icon: "ar" },
    { code: 2036, name: "Australia", icon: "au" },
    { code: 2040, name: "Austria", icon: "at" },
    { code: 2048, name: "Bahrain", icon: "bh" },
    { code: 2050, name: "Bangladesh", icon: "bd" },
    { code: 2051, name: "Armenia", icon: "am" },
    { code: 2056, name: "Belgium", icon: "be" },
    { code: 2068, name: "Bolivia", icon: "bo" },
    { code: 2076, name: "Brazil", icon: "br" },
    { code: 2100, name: "Bulgaria", icon: "bg" },
    { code: 2104, name: "Myanmar (Burma)", icon: "mm" },
    { code: 2116, name: "Cambodia", icon: "kh" },
    { code: 2120, name: "Cameroon", icon: "cm" },
    { code: 2124, name: "Canada", icon: "ca" },
    { code: 2144, name: "Sri Lanka", icon: "lk" },
    { code: 2152, name: "Chile", icon: "cl" },
    { code: 2158, name: "Taiwan", icon: "tw" },
    { code: 2170, name: "Colombia", icon: "co" },
    { code: 2188, name: "Costa Rica", icon: "cr" },
    { code: 2191, name: "Croatia", icon: "hr" },
    { code: 2196, name: "Cyprus", icon: "cy" },
    { code: 2203, name: "Czechia", icon: "cz" },
    { code: 2208, name: "Denmark", icon: "dk" },
    { code: 2218, name: "Ecuador", icon: "ec" },
    { code: 2222, name: "El Salvador", icon: "sv" },
    { code: 2233, name: "Estonia", icon: "ee" },
    { code: 2246, name: "Finland", icon: "fi" },
    { code: 2250, name: "France", icon: "fr" },
    { code: 2276, name: "Germany", icon: "de" },
    { code: 2288, name: "Ghana", icon: "gh" },
    { code: 2300, name: "Greece", icon: "gr" },
    { code: 2320, name: "Guatemala", icon: "gt" },
    { code: 2344, name: "Hong Kong", icon: "hk" },
    { code: 2348, name: "Hungary", icon: "hu" },
    { code: 2356, name: "India", icon: "in" },
    { code: 2360, name: "Indonesia", icon: "id" },
    { code: 2372, name: "Ireland", icon: "ie" },
    { code: 2376, name: "Israel", icon: "il" },
    { code: 2380, name: "Italy", icon: "it" },
    { code: 2384, name: "Cote d'Ivoire", icon: "ci" },
    { code: 2392, name: "Japan", icon: "jp" },
    { code: 2398, name: "Kazakhstan", icon: "kz" },
    { code: 2400, name: "Jordan", icon: "jo" },
    { code: 2404, name: "Kenya", icon: "ke" },
    { code: 2410, name: "South Korea", icon: "kr" },
    { code: 2428, name: "Latvia", icon: "lv" },
    { code: 2440, name: "Lithuania", icon: "lt" },
    { code: 2458, name: "Malaysia", icon: "my" },
    { code: 2470, name: "Malta", icon: "mt" },
    { code: 2484, name: "Mexico", icon: "mx" },
    { code: 2504, name: "Morocco", icon: "ma" },
    { code: 2528, name: "Netherlands", icon: "nl" },
    { code: 2554, name: "New Zealand", icon: "nz" },
    { code: 2558, name: "Nicaragua", icon: "ni" },
    { code: 2566, name: "Nigeria", icon: "ng" },
    { code: 2578, name: "Norway", icon: "no" },
    { code: 2586, name: "Pakistan", icon: "pk" },
    { code: 2591, name: "Panama", icon: "pa" },
    { code: 2600, name: "Paraguay", icon: "py" },
    { code: 2604, name: "Peru", icon: "pe" },
    { code: 2608, name: "Philippines", icon: "ph" },
    { code: 2616, name: "Poland", icon: "pl" },
    { code: 2620, name: "Portugal", icon: "pt" },
    { code: 2642, name: "Romania", icon: "ro" },
    { code: 2682, name: "Saudi Arabia", icon: "sa" },
    { code: 2686, name: "Senegal", icon: "sn" },
    { code: 2688, name: "Serbia", icon: "rs" },
    { code: 2702, name: "Singapore", icon: "sg" },
    { code: 2703, name: "Slovakia", icon: "sk" },
    { code: 2704, name: "Vietnam", icon: "vn" },
    { code: 2705, name: "Slovenia", icon: "si" },
    { code: 2710, name: "South Africa", icon: "za" },
    { code: 2724, name: "Spain", icon: "es" },
    { code: 2752, name: "Sweden", icon: "se" },
    { code: 2756, name: "Switzerland", icon: "ch" },
    { code: 2764, name: "Thailand", icon: "th" },
    { code: 2784, name: "United Arab Emirates", icon: "ae" },
    { code: 2788, name: "Tunisia", icon: "tn" },
    { code: 2792, name: "Turkiye", icon: "tr" },
    { code: 2804, name: "Ukraine", icon: "ua" },
    { code: 2807, name: "North Macedonia", icon: "mk" },
    { code: 2818, name: "Egypt", icon: "eg" },
    { code: 2826, name: "United Kingdom", icon: "gb" },
    { code: 2840, name: "United States", icon: "us" },
    { code: 2854, name: "Burkina Faso", icon: "bf" },
    { code: 2858, name: "Uruguay", icon: "uy" },
    { code: 2862, name: "Venezuela", icon: "ve" }
  ];


  const [exactCountry, setExactCountry] = useState({code : "", name : "Exact Location", icon : ""})
    const [showCountryList, setShowCountryList] = useState(false);
    const dropdownRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSearch = async () => {
    if (keyword.length < 3 || keyword.length > 50) {
      setError("Keyword too short");
      return;
    }
    if (!/^[a-zA-Z0-9\s,]*$/.test(keyword)) {
      setError("No special symbols accepted");
      return;
    }

    setLoading(true);
    setButtonDisabled(true);
    setTimeout(() => setButtonDisabled(false), 8000);

    const countryCode = exactCountry.code || "";
    const exactSearchValue = exactSearch ? "true" : "false";
    const url = `https://api.keywordmagic.io/kwmagic?UID=${UID}&keywords=${keyword}&exactSearch=${exactSearchValue}&countryCode=${countryCode}`;
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 80000);

    try {
      const response = await fetch(url, { signal: controller.signal });
      clearTimeout(timeoutId);

      if (!response.ok) {
        if (response.status === 402) {
          throw new Error('Account limit reached');
        } else if (response.status === 401) {
          throw new Error("Unauthorized access, please re-login");
        } else if (response.status === 404) {
          throw new Error("Sorry, couldn't find requested data");
        } else if (response.status === 500) {
          throw new Error('Server busy, please try again later');
        } else {
          throw new Error('Issue occurred, please try again later');
          //throw new Error(`HTTP error! status: ${response.status}`);
        }
      }

      const apiData = await response.json();

      const transformedData = {
        titles: ["Keyword", "Competition", "Difficulty", "Search volume", "Trend"],
        data: apiData.map(item => ({
          winning: item.winning,
          keyword: item.keyword,
          competition: item.competition,
          competition_index: item.competition_index,
          search_volume: item.search_volume,
          trend: parseFloat(item.trend),
        }))
      };
      await refreshUserData(login);
      setData(transformedData);
      setError(null);
      setCurrentPage(1);
      setRefreshSearchList(prev => !prev);
      localStorage.setItem("search_query", keyword);
    } catch (error) {
      setError(error.message || "An error occurred, please try again later");
      }
      finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    if (/^[a-zA-Z0-9\s,]*$/.test(value)) {
      setKeyword(value);
      setError(null);
    } else {
      setError("No special symbols accepted");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleEntriesChange = (e) => {
    const value = parseInt(e.target.value, 10);
    setEntriesInput(value);

    if (debounceTimeoutRef.current) {
      clearTimeout(debounceTimeoutRef.current);
    }

    debounceTimeoutRef.current = setTimeout(() => {
      if (value >= 10 && value <= 100) {
        setEntriesPerPage(value);
        setCurrentPage(1);
      } else {
        setEntriesInput(entriesPerPage);
      }
    }, 1000);
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handleSearchClick = async (searchQuery) => {
    setLoading(true);

    const url = `https://api.keywordmagic.io/get_results?UID=${UID}&query=${searchQuery}`;
    try {
      const response = await fetch(url);

      if (!response.ok) {
        if (response.status === 402) {
          throw new Error('Account limit reached');
        } else if (response.status === 401) {
          throw new Error("Unauthorized access, please re-login");
        } else if (response.status === 404) {
          throw new Error("Sorry, couldn't find requested data");
        } else if (response.status === 500) {
          throw new Error('Server busy, please try again later');
        } else {
          throw new Error('Issue occurred, please try again later');
          //throw new Error(`HTTP error! status: ${response.status}`);
        }
      }

      const apiData = await response.json();
      const transformedData = {
        titles: ["Keyword", "Competition", "Difficulty", "Search volume", "Trend"],
        data: apiData.map(item => ({
          winning: item.winning,
          keyword: item.keyword,
          competition: item.competition,
          competition_index: item.competition_index,
          search_volume: item.search_volume,
          trend: parseFloat(item.trend),
        }))
      };

      setData(transformedData);
      setError(null);
      setCurrentPage(1);
    } catch (error) {
      setError(error.message || "An error occurred, please try again later");
    } finally {
      setLoading(false);
    }
  };

  // hide custom dropdown list while clicking outside
  useEffect(() => {

    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowCountryList(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside)

    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])
  


  return (
    <div className="dashbord-container">
      <div className="new-tag">New!<div className="live-trends"><a href="/dashboard/trends">Live Trends</a><svg className="live-svg" xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 50 50" fill="white">
      <path d="M 8.03125 8.4570312 C 7.770375 8.4589063 7.5103125 8.5625312 7.3203125 8.7695312 C 3.3953125 13.041531 1 18.741 1 25 C 1 31.259 3.3953125 36.958469 7.3203125 41.230469 C 7.7003125 41.644469 8.3569063 41.643094 8.7539062 41.246094 L 10.882812 39.117188 C 11.265812 38.734187 11.263391 38.124656 10.900391 37.722656 C 7.8553906 34.352656 6 29.889 6 25 C 6 20.111 7.8553906 15.647344 10.900391 12.277344 C 11.263391 11.875344 11.265813 11.266812 10.882812 10.882812 L 8.7539062 8.7539062 C 8.5554063 8.5554063 8.292125 8.4551562 8.03125 8.4570312 z M 41.96875 8.4570312 C 41.707625 8.4554062 41.444594 8.5554062 41.246094 8.7539062 L 39.115234 10.884766 C 38.732234 11.267766 38.734656 11.875344 39.097656 12.277344 C 42.143656 15.646344 44 20.111 44 25 C 44 29.889 42.144609 34.352656 39.099609 37.722656 C 38.736609 38.124656 38.734188 38.733187 39.117188 39.117188 L 41.246094 41.246094 C 41.643094 41.643094 42.299687 41.643469 42.679688 41.230469 C 46.604687 36.958469 49 31.259 49 25 C 49 18.741 46.604687 13.041531 42.679688 8.7695312 C 42.489688 8.5625312 42.229875 8.4586563 41.96875 8.4570312 z M 35.625 14.837891 C 35.355125 14.824516 35.079594 14.920406 34.871094 15.128906 L 32.740234 17.259766 C 32.381234 17.618766 32.341969 18.196938 32.667969 18.585938 C 34.123969 20.323937 35 22.561 35 25 C 35 27.439 34.123969 29.675109 32.667969 31.412109 C 32.341969 31.801109 32.381234 32.379281 32.740234 32.738281 L 34.871094 34.871094 C 35.288094 35.288094 35.967516 35.250687 36.353516 34.804688 C 38.625516 32.175687 40 28.748 40 25 C 40 21.252 38.625516 17.824312 36.353516 15.195312 C 36.160516 14.972313 35.894875 14.851266 35.625 14.837891 z M 14.375 14.839844 C 14.105125 14.853219 13.839484 14.974266 13.646484 15.197266 C 11.374484 17.825266 10 21.252 10 25 C 10 28.748 11.374484 32.175688 13.646484 34.804688 C 14.032484 35.250687 14.711906 35.288094 15.128906 34.871094 L 17.259766 32.740234 C 17.618766 32.381234 17.658031 31.803062 17.332031 31.414062 C 15.876031 29.676062 15 27.439 15 25 C 15 22.561 15.876031 20.324891 17.332031 18.587891 C 17.658031 18.198891 17.618766 17.620719 17.259766 17.261719 L 15.128906 15.128906 C 14.920406 14.920406 14.644875 14.826469 14.375 14.839844 z M 25 19 C 21.686 19 19 21.686 19 25 C 19 28.314 21.686 31 25 31 C 28.314 31 31 28.314 31 25 C 31 21.686 28.314 19 25 19 z"></path>
      </svg></div></div>
      <div className="input-feild-container">
        <input
          type="text"
          placeholder="Enter your keyword(s) to begin"
          className="dashbord-search-input"
          value={keyword}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}  // Added this line
          maxLength={50}
        />
        <button className="dashbord-search-btn" onClick={handleSearch} disabled={buttonDisabled}>
          Search <img src={search} alt="" />
        </button>
        <div className="exact-search-container">
          <input 
            type="checkbox" 
            id="exact-search" 
            checked={exactSearch} 
            onChange={() => setExactSearch(!exactSearch)} 
          />
          <label htmlFor="exact-search">
            Exact Search<Tooltip text="Avoids related keywords, results might be severely limited"><span className="question-mark">?</span></Tooltip>
          </label>

          <div ref={dropdownRef} className="exact-country-dropdown-container" >
            <div className="exact-country-dropdown" onClick={() => setShowCountryList(prev => !prev)} value={exactCountry.name} >{exactCountry.icon && <img src={`https://flagcdn.com/16x12/${exactCountry.icon}.png`} alt="" />} <p>{exactCountry.name}</p> <img className="icon-dropdown" src={icon_angle_down}/></div>

            {showCountryList && <ul className="exact-country-dropdown-list">
              <li onClick={() => {setExactCountry({code : "", name : "Exact Location", icon : ""}); setShowCountryList(false)}}>Exact Location</li>
              {countries.map((country, index) => (
                <li key={index} onClick={() => {setExactCountry(country); setShowCountryList(false);}}><img src={`https://flagcdn.com/16x12/${country.icon}.png`} alt="" />{country.name}</li>
              ))}
            </ul>}
          </div>


          <Tooltip text="Country specific results may be severely limited"><span className="question-mark">?</span></Tooltip>
        </div>
        {error && <div className="error-message">{error}</div>}
      </div>
      <div className="dashboard-tables-container">
        <SearchList onSearchClick={handleSearchClick} refresh={refreshSearchList} />
        {loading && <div className="loader-box"><div className="loader"></div><p className="loading-info">Looking for data, this may take up to 60 seconds</p></div>}
        {!loading && !data && (<div className="welcome-message" data-aos="fade">{Subscription === "Trial" ? "Trial plan is limited to 3 queries per day, upgrade for unlimited searches" : "Begin a new search by typing in one or more comma-separated keywords above"}</div>)}
        {!loading && data &&(
          <KeywordTable
            showTableInfo={true}
            keywordData={data}
            paginationEnabled={true}
            currentPage={currentPage}
            entriesPerPage={entriesPerPage}
            entriesInput={entriesInput}
            onEntriesChange={handleEntriesChange}
            onPageChange={handlePageChange}
            Subscription={Subscription}
          />
        )}
      </div>
    </div>
  );
}

export { refreshUserData };
export default Dashboard;
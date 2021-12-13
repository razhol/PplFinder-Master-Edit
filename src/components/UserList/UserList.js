import React, { useEffect, useState } from "react";
import Text from "components/Text";
import Spinner from "components/Spinner";
import CheckBox from "components/CheckBox";
import IconButton from "@material-ui/core/IconButton";
import FavoriteIcon from "@material-ui/icons/Favorite";
import * as S from "./style";

const UserList = ({ users, isLoading }) => {

  const [hoveredUserId, setHoveredUserId] = useState();
  const [usersList, setUsersList] = useState([]);
  const [checkListByCountry, setCheckListByCountry] = useState([{ country: "Brazil", checked: false }, { country: "Australia", checked: false }, { country: "Canada", checked: false }, { country: "Germany", checked: false }, { country: "France", checked: false }]);



  useEffect(() => {
    if (JSON.parse(localStorage.getItem("favoriteUsers")) != null) {
      users.forEach(x => {
        let MarkedFavoritesList = JSON.parse(localStorage.getItem("favoriteUsers")).find(y => x.login.uuid == y.login.uuid)
        
        x.isFavorite = MarkedFavoritesList != null;
      })
    }
    setUsersList(users)
  }
    , [users])



  const handleMouseEnter = (index) => {
    setHoveredUserId(index);
  };

  const addToFavorite = (user) => {
    user.isFavorite = !user.isFavorite
    var favotireUsers = JSON.parse(localStorage.getItem("favoriteUsers"));
    if (user.isFavorite == true) {
      if (favotireUsers == null) favotireUsers = [];
      favotireUsers.push(user);
      localStorage.setItem("favoriteUsers", JSON.stringify(favotireUsers));
    }
    else {

      let UpdatedfavotireUsers = favotireUsers.filter(y => user.login.uuid != y.login.uuid)

      localStorage.setItem("favoriteUsers", JSON.stringify(UpdatedfavotireUsers));

    }

  };

  const handleMouseLeave = () => {
    setHoveredUserId();
  };

  const filterByCountry = (country) => {
    let index = checkListByCountry.findIndex(x => x.country == country);
    checkListByCountry[index].checked = !checkListByCountry[index].checked
    let markedCoutries = checkListByCountry.filter(x => x.checked == true).map(x => x.country)
    if (markedCoutries.length > 0) {
      let filterdList = users.filter(x => x.location.country == markedCoutries.find(y => y == x.location.country));
      setUsersList(filterdList)
    }
    else {
      setUsersList(users)
    }

  };

  return (
    <S.UserList>
      <S.Filters>
        <CheckBox onChange={(e) => { filterByCountry(e) }} value="Brazil" label="Brazil" />
        <CheckBox onChange={(e) => { filterByCountry(e) }} value="Australia" label="Australia" />
        <CheckBox onChange={(e) => { filterByCountry(e) }} value="Canada" label="Canada" />
        <CheckBox onChange={(e) => { filterByCountry(e) }} value="Germany" label="Germany" />
        <CheckBox onChange={(e) => { filterByCountry(e) }} value="France" label="France" />
      </S.Filters>
      <S.List>
        {usersList.map((user, index) => {
          return (
            <S.User
              key={index}
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={handleMouseLeave}
            >
              <S.UserPicture src={user?.picture.large} alt="" />
              <S.UserInfo>
                <Text size="22px" bold>
                  {user?.name.title} {user?.name.first} {user?.name.last}
                </Text>
                <Text size="14px">{user?.email}</Text>
                <Text size="14px">
                  {user?.location.street.number} {user?.location.street.name}
                </Text>
                <Text size="14px">
                  {user?.location.city} {user?.location.country}
                </Text>
              </S.UserInfo>
              <S.IconButtonWrapper onClick={() => addToFavorite(user)} isVisible={user.isFavorite || index === hoveredUserId} >
                <IconButton  >
                  <FavoriteIcon color="error" />
                </IconButton>
              </S.IconButtonWrapper>
            </S.User>
          );
        })}
        {isLoading && (
          <S.SpinnerWrapper>
            <Spinner color="primary" size="45px" thickness={6} variant="indeterminate" />
          </S.SpinnerWrapper>
        )}
      </S.List>
    </S.UserList>
  );
};

export default UserList;

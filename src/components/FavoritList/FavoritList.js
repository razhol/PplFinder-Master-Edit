import React, { useEffect, useState } from "react";
import Text from "components/Text";
import IconButton from "@material-ui/core/IconButton";
import FavoriteIcon from "@material-ui/icons/Favorite";
import * as S from "./style";

const FavoritList = () => {

    const [FavoritList, setFavoritList] = useState([]);


    useEffect(() => {
        setFavoritList(JSON.parse(localStorage.getItem("favoriteUsers")))
    }
        , [])


    const deleteFromFavorite = (user) => {
        let UpdatedFavoriteUsers = JSON.parse(localStorage.getItem("favoriteUsers")).filter(y => user.login.uuid != y.login.uuid)
        localStorage.setItem("favoriteUsers", JSON.stringify(UpdatedFavoriteUsers));
        setFavoritList(JSON.parse(localStorage.getItem("favoriteUsers")))
    };



    return (
        <S.UserList>

            <S.List>
                {FavoritList.map((user, index) => {
                    return (
                        <S.User
                            key={index}
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
                            <S.IconButtonWrapper onClick={() => deleteFromFavorite(user)} isVisible={user.isFavorite}>
                                <IconButton  >
                                    <FavoriteIcon color="error" />
                                </IconButton>
                            </S.IconButtonWrapper>
                        </S.User>
                    );
                })}
            </S.List>
        </S.UserList>
    );
};

export default FavoritList;

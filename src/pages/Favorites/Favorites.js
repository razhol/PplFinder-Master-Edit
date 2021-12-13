import React from "react";
import Text from "components/Text";
import FavoritList from "components/FavoritList/FavoritList";
import * as S from "./style";

const Favorites = () => {
  
  return (
 <div>
    <S.Favorites>
      <S.Content>
        <S.Header>
          <Text size="64px" bold>
            Favorites Page
          </Text>
        </S.Header>
        <FavoritList />
      </S.Content>
    </S.Favorites>
 </div>
  );
};

export default Favorites;
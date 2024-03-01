import { resetFavorite } from "@/store/nextSlice";
import { useDispatch } from "react-redux";

const ResetFavoriteItems = () => {
  const dispatch = useDispatch();
  const handleResetCart = () => {
    const confirmReset = window.confirm(
      "Are you sure to reset your list?"
    );
    if (confirmReset) {
      dispatch(resetFavorite());
    }
  };
  return (
    <button
      onClick={handleResetCart}
      className="btn btn-error btn-outline"
    >
      Clear list
    </button>
  );
};

export default ResetFavoriteItems;
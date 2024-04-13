import { resetFavorite } from "@/store/nextSlice";
import { useDispatch } from "react-redux";

const ResetFavoriteItems = () => {
  const dispatch = useDispatch();
  const handleResetCart = () => {
    const confirmReset = window.confirm(
      "Estás seguro de eliminar la lista?"
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
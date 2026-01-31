import Swal from "sweetalert2";

export const toast = (
  title: string,
  icon: "success" | "error" | "warning" = "success",
) => {
  console.log(`Log: Alerting user - ${title}`);
  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
  });

  return Toast.fire({
    icon,
    title,
  });
};

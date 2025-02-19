import React, { useState, useEffect } from "react";
import { useUser } from "../../UserContext";
import AxiosConfiguration from "../../AxiosConfiguration";

export const OtherProfileBanner = ({ usuario }) => {
  const { usuario: loggedUser, actualizarUsuario } = useUser();
  const [follow, setFollow] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  console.log(usuario);

  useEffect(() => {
    if (
      loggedUser &&
      loggedUser.followingIds &&
      loggedUser.followingIds.includes(usuario.id)
    ) {
      setFollow(true);
    } else {
      setFollow(false);
    }
  }, [loggedUser, usuario.id]);

  const handleFollow = () => {
    const authToken = localStorage.getItem("authToken");
    if (!authToken) {
      alert(
        "No se encontró token de autenticación. Por favor, inicia sesión de nuevo."
      );
      return;
    }

    setIsLoading(true);

    if (follow) {
      AxiosConfiguration.delete(
        `/follows/unfollow?followerId=${usuario.id}&followingId=${loggedUser.id}`,
        { headers: { Authorization: `Bearer ${authToken}` } }
      )
        .then((response) => {
          setFollow(false);
          const newFollowingIds = loggedUser.followingIds.filter(
            (id) => id !== usuario.id
          );
          const updatedLoggedUser = {
            ...loggedUser,
            followingIds: newFollowingIds,
          };
          actualizarUsuario(updatedLoggedUser);
          alert("¡Has dejado de seguir al usuario!");
        })
        .catch((error) => {
          console.error("Error unfollowing:", error);
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      AxiosConfiguration.post(
        "/follows",
        {
          usernameFollowedId: loggedUser.id,
          usernameFollowingId: usuario.id,
          date: new Date().toISOString(),
        },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      )
        .then((response) => {
          setFollow(true);
          const newFollowingIds = Array.from(
            new Set([...loggedUser.followingIds, usuario.id])
          );
          const updatedLoggedUser = {
            ...loggedUser,
            followingIds: newFollowingIds,
          };
          actualizarUsuario(updatedLoggedUser);
          alert("¡Usuario seguido con éxito!");
        })
        .catch((error) => {
          console.error("Error following:", error);
          alert("Hubo un error al seguir al usuario. Inténtalo de nuevo.");
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  };

  // Asegúrate de que la imagen tenga la URL completa
  const profileImagePath = usuario.photo.startsWith("http")
    ? usuario.photo
    : `http://localhost:8083/api/publications/images/${usuario.photo}`;

    return (
      <div className="w-full flex flex-col items-center bg-gray-50">
        <div
          className="w-full h-48 sm:h-64 md:h-72 lg:h-80 bg-cover bg-center relative"
          style={{
            backgroundImage: `url(${usuario.banner})`,
            backgroundPosition: "center",
          }}
        >
          <div className="absolute inset-0 bg-black/20"></div>
        </div>
  
        <div className="w-full max-w-4xl px-4">
          <div className="relative bg-white rounded-xl shadow-lg -mt-20 p-6">
            <div className="absolute -top-16 left-1/2 transform -translate-x-1/2">
              <div className="w-32 h-32 rounded-full border-4 border-white shadow-lg overflow-hidden bg-white">
                <img
                  src={profileImagePath}
                  alt={`${usuario.name} ${usuario.lastname}`}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
  
            <div className="mt-20 text-center">
              <h3 className="text-3xl font-bold text-gray-900">
                {usuario.name} {usuario.lastname}
              </h3>
              <p className="text-gray-500 text-lg mt-1">@{usuario.username}</p>
            </div>
  
            <div className="flex justify-center gap-16 mt-8">
              <div className="flex flex-col items-center">
                <span className="text-2xl font-bold text-gray-900">
                  {usuario.publications.length}
                </span>
                <span className="text-sm font-medium text-gray-500">Posts</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-2xl font-bold text-gray-900">
                  {usuario.followersIds.length}
                </span>
                <span className="text-sm font-medium text-gray-500">Followers</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-2xl font-bold text-gray-900">
                  {usuario.followingIds.length}
                </span>
                <span className="text-sm font-medium text-gray-500">Following</span>
              </div>
            </div>
  
            <p className="text-gray-600 text-center mt-6 max-w-2xl mx-auto">
              {usuario.bio || "Hola, soy un ser humano que le importa."}
            </p>
  
            <div className="flex justify-center mt-8">
              <button
                onClick={handleFollow}
                disabled={isLoading}
                className={`
                  inline-flex items-center gap-2 
                  px-8 py-2.5 
                  rounded-full
                  font-medium
                  transition duration-200
                  ${follow 
                    ? 'bg-gray-500 text-white hover:bg-black' 
                    : 'bg-blue-500 text-white hover:bg-blue-600'
                  }
                  ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}
                `}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Cargando...</span>
                  </>
                ) : (
                  follow ? 'Dejar de seguir' : 'Seguir'
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
};

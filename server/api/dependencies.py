from typing import Callable, Type


def get_service(Service_type: Type, *args, **kwargs) -> Callable:
    def get_serv() -> Type[Service_type]:
        return Service_type(args, **kwargs)

    return get_serv

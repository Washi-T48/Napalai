import psutil
import ipaddress


# List Interfaces
def listIF(ifaddrs):
    IP = []
    for i in ifaddrs:
        for j in ifaddrs[i]:
            if j.family.name == "AF_INET":  # Check if ip family name is IPV4
                IP.append(j)
    return IP


print(
    [
        ipaddress.ip_interface(i.address + "/" + i.netmask)
        for i in (listIF(psutil.net_if_addrs()))
    ]
)

import statsd
import time
import psutil
import multiprocessing

def disk():
    c = statsd.StatsClient('statsd', 8125, prefix='system.disk')
    while True:
        disk_usage = psutil.disk_usage('/')
        c.gauge('root.total', disk_usage.total)
        print('root.total ' + str(disk_usage.total))
        c.gauge('root.used', disk_usage.used)
        print('root.used ' +  str(disk_usage.used))
        c.gauge('root.free', disk_usage.free)
        print('root.free ' +  str(disk_usage.free))
        c.gauge('root.percent', disk_usage.percent)
        print('root.percent ' +  str(disk_usage.percent))
            
        time.sleep(10)

def cpu_times():
    c = statsd.StatsClient('statsd', 8125, prefix='system.cpu')
    while True:
        cpu_times = psutil.cpu_times()
        c.gauge('system_wide.times.user', cpu_times.user)
        print('system_wide.times.user ' +  str(cpu_times.user))
        c.gauge('system_wide.times.nice', cpu_times.nice)
        print('system_wide.times.nice ' +  str(cpu_times.nice))
        c.gauge('system_wide.times.system', cpu_times.system)
        print('system_wide.times.system ' +  str(cpu_times.system))
        c.gauge('system_wide.times.idle', cpu_times.idle)
        print('system_wide.times.idle ' +  str(cpu_times.idle))
        c.gauge('system_wide.times.iowait', cpu_times.iowait)
        print('system_wide.times.iowait ' +  str(cpu_times.iowait))
        c.gauge('system_wide.times.irq', cpu_times.irq)
        print('system_wide.times.irq ' +  str(cpu_times.irq))
        c.gauge('system_wide.times.softirq', cpu_times.softirq)
        print('system_wide.times.softirq ' +  str(cpu_times.softirq))
        c.gauge('system_wide.times.steal', cpu_times.steal)
        print('system_wide.times.steal ' +  str(cpu_times.steal))
        c.gauge('system_wide.times.guest', cpu_times.guest)
        print('system_wide.times.guest ' +  str(cpu_times.guest))
        c.gauge('system_wide.times.guest_nice', cpu_times.guest_nice)
        
        time.sleep(10)

def cpu_times_percent():
    c = statsd.StatsClient('statsd', 8125, prefix='system.cpu')
    while True:
        value = psutil.cpu_percent(interval=1)
        c.gauge('system_wide.percent', value)

        cpu_times_percent = psutil.cpu_times_percent(interval=1)
        c.gauge('system_wide.times_percent.user', cpu_times_percent.user)
        print('system_wide.times_percent.user ' +  str(cpu_times_percent.user))
        c.gauge('system_wide.times_percent.nice', cpu_times_percent.nice)
        print('system_wide.times_percent.nice ' +  str(cpu_times_percent.nice))
        c.gauge('system_wide.times_percent.system', cpu_times_percent.system)
        print('system_wide.times_percent.system ' +  str(cpu_times_percent.system))
        c.gauge('system_wide.times_percent.idle', cpu_times_percent.idle)
        print('system_wide.times_percent.idle ' +  str(cpu_times_percent.idle))
        c.gauge('system_wide.times_percent.iowait', cpu_times_percent.iowait)
        print('system_wide.times_percent.iowait ' +  str(cpu_times_percent.iowait))
        c.gauge('system_wide.times_percent.irq', cpu_times_percent.irq)
        print('system_wide.times_percent.irq ' +  str(cpu_times_percent.irq))
        c.gauge('system_wide.times_percent.softirq', cpu_times_percent.softirq)
        print('system_wide.times_percent.softirq ' +  str(cpu_times_percent.softirq))
        c.gauge('system_wide.times_percent.steal', cpu_times_percent.steal)
        print('system_wide.times_percent.steal ' +  str(cpu_times_percent.steal))
        c.gauge('system_wide.times_percent.guest', cpu_times_percent.guest)
        print('system_wide.times_percent.guest ' +  str(cpu_times_percent.guest))
        c.gauge('system_wide.times_percent.guest_nice', cpu_times_percent.guest_nice)
        print('system_wide.times_percent.guest_nice ' +  str(cpu_times_percent.guest_nice))

        time.sleep(10)

def memory():
    c = statsd.StatsClient('statsd', 8125, prefix='system.memory')
    while True:
        swap = psutil.swap_memory()
        c.gauge('swap.total', swap.total)
        print('swap.total ' +  str(swap.total))
        c.gauge('swap.used', swap.used)
        print('swap.used ' +  str(swap.used))
        c.gauge('swap.free', swap.free)
        print('swap.free ' +  str(swap.free))
        c.gauge('swap.percent', swap.percent)
        print('swap.percent ' +  str(swap.percent))

        virtual = psutil.virtual_memory()
        c.gauge('virtual.total', virtual.total)
        print('virtual.total ' +  str(virtual.total))
        c.gauge('virtual.available', virtual.available)
        print('virtual.available ' +  str(virtual.available))
        c.gauge('virtual.used', virtual.used)
        print('virtual.used ' +  str(virtual.used))
        c.gauge('virtual.free', virtual.free)
        print('virtual.free ' +  str(virtual.free))
        c.gauge('virtual.percent', virtual.percent)
        print('virtual.percent ' +  str(virtual.percent))
        c.gauge('virtual.active', virtual.active)
        print('virtual.active ' +  str(virtual.active))
        c.gauge('virtual.inactive', virtual.inactive)
        print('virtual.inactive ' +  str(virtual.inactive))
        c.gauge('virtual.buffers', virtual.buffers)
        print('virtual.buffers ' +  str(virtual.buffers))
        c.gauge('virtual.cached', virtual.cached)
        
        time.sleep(10)
        
if __name__ == '__main__':
    multiprocessing.Process(target=disk).start()
    multiprocessing.Process(target=cpu_times).start()
    multiprocessing.Process(target=cpu_times_percent).start()
    multiprocessing.Process(target=memory).start()



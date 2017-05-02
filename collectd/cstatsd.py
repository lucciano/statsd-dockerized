#### a ripoff 
import collectd
import statsd
client = statsd.StatsClient(
        host="statsd",
        port=8125,
        prefix="statsd"
    )


def init_fun():
    collectd.info('my py module init called')

def reader(input_data=None):
    collectd.info('my py read called')

def writer(input_data=None):
    collectd.info('my py write called' + str(input_data))
    stats_path = '.'.join(filter(None, [
        # plugin name
        input_data.plugin,
        # plugin instance, if any
        getattr(input_data, 'plugin_instance', None),
        # type, if any
        getattr(input_data, 'type', None),
        # The name of the type instance
        input_data.type_instance,
    ]))
    for idx, value in enumerate(input_data.values):
        value = int(value)
	if len(input_data.values) > 1:
            path = '.'.join((stats_path, types[input_data.type][idx]['name']))
        else:
            path = stats_path

        collectd.info('%s: %s = %s' % (input_data.plugin, path, value))
        client.gauge(path, value)

def parse_sources(sources):
    """
    Given a string of data sources; the second field in a line from a
    collectd types database, return a list of dictionaries describing those
    data sources.

    The sources should be delimited by spaces and, optionally, a comma
    (",") right after each list-entry.

    Each data-source is defined by a quadruple made up of the data-source
    name, type, minimal and maximal values, delimited by colons (":"):
    ds-name:ds-type:min:max. ds-type may be either ABSOLUTE, COUNTER,
    DERIVE, or GAUGE. min and max define the range of valid values for data
    stored for this data-source.
    """
    fields = ('name', 'type', 'min', 'max')
    sources = sources.replace(',', ' ').split()
    return [dict(zip(fields, source.split(':'))) for source in sources]



def parse_types(path):
    """
    Parse the file at PATH as a collectd types database, returning a
    dictionary of type information.

    Each line consists of two fields delimited by spaces and/or horizontal
    tabs. The first field defines the name of the data- set, while the
    second field defines a list of data-source specifications
    """
    with open(path) as types_db:
        # Split each line on the first run of whitespace. The first item of
        # each split is the name of the data-set. The second field is the
        # data-source specifications for that data set. We skip empty lines
        # and lines that start with '#' - these are comments.
        stripped = (line.strip() for line in types_db)
        specs = [line.split(None, 1) for line in stripped
                 if line and not line.startswith('#')]

    return dict((name, parse_sources(sources)) for name, sources in specs)

types = parse_types( '/usr/share/collectd/types.db');





#collectd.register_config(configer)
#collectd.register_init(init_fun)
#collectd.register_read(reader)
collectd.register_write(writer)

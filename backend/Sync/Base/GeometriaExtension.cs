
using System;
using System.Collections.Generic;
using System.Linq;
using NetTopologySuite.Geometries;
using Newtonsoft.Json;

namespace Sync.Base
{
  public class SyncCoordinate
  {
    public double longitude { get; set; }
    public double latitude { get; set; }
  }

  public static class GeometriaExtension
  {
    public static object ConvertGeometriaToMobile(this Geometry geometry)
    {
      if (geometry != null)
      {
        object geom;
        switch (geometry.OgcGeometryType)
        {
          case NetTopologySuite.Geometries.OgcGeometryType.Point:
            geom = ConvertCoordinate(geometry.Coordinate.X, geometry.Coordinate.Y);
            break;
          case NetTopologySuite.Geometries.OgcGeometryType.Polygon:
          case NetTopologySuite.Geometries.OgcGeometryType.LineString:
          case NetTopologySuite.Geometries.OgcGeometryType.MultiPolygon:
          case NetTopologySuite.Geometries.OgcGeometryType.MultiPoint:
            geom = geometry.Coordinates.Select(c => ConvertCoordinate(c.X, c.Y));
            break;
          default:
            geom = null;
            break;
        }

        return JsonConvert.SerializeObject(geom);
      }

      return null;
    }

    private static object ConvertCoordinate(double x, double y)
    {
      return new SyncCoordinate { latitude = y, longitude = x };
    }

    public static Geometry ConvertMobileToGeometria(this String geometry)
    {
      List<SyncCoordinate> coordinates = new List<SyncCoordinate>();
      try
      {
        var coordinate = JsonConvert.DeserializeObject<SyncCoordinate>(geometry);
        coordinates.Add(coordinate);
      }
      catch
      {
        coordinates = JsonConvert.DeserializeObject<List<SyncCoordinate>>(geometry);
      }

      return ToGeometry(coordinates);
    }

    public static Geometry ToGeometry(List<SyncCoordinate> coordinates)
    {
      var bounds = coordinates.Select(coordinate => new Coordinate(coordinate.longitude, coordinate.latitude)).ToList();

      if (bounds.Count == 1)
      {
        NetTopologySuite.Geometries.Point point = new NetTopologySuite.Geometries.Point(bounds.FirstOrDefault());
        return point;
      }
      else
      {
        NetTopologySuite.Geometries.LinearRing ring = new NetTopologySuite.Geometries.LinearRing(bounds.ToArray());
        NetTopologySuite.Geometries.Polygon polygon = new NetTopologySuite.Geometries.Polygon(ring);
        return polygon;
      }
    }
  }
}
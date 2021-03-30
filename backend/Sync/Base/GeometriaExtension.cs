
using System;
using System.Linq;
using NetTopologySuite.Geometries;
using Newtonsoft.Json;

namespace Sync.Base
{
  public class Coordinate
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
      return new Coordinate { latitude = y, longitude = x };
    }
  }
}
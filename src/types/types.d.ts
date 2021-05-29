interface ISpotifyBase {
  external_urls: ISpotifyExternalUrls;
  href: string;
  id: string;
  uri: string;
}

interface ISpotifyExternalUrls {
  spotify: string;
}

interface ISpotifyImage {
  height: number;
  url: string;
  width: number;
}

interface ISpotifyPlaylist extends ISpotifyBase {
  collaborative: boolean;
  description: string;
  images: ISpotifyImage[];
  name: string;
  owner: ISpotifyUser;
  primary_color: null;
  public: boolean;
  snapshot_id: string;
  tracks: ISpotifyTracks;
  type: string;
}

interface ISpotifyTracks {
  href: string;
  total: number;
}

interface ISpotifyUser extends ISpotifyBase {
  display_name: string;
  type: string;
}

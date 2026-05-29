export interface GoogleUser {
  id: string;
  email: string;
  verified_email: boolean;
  name: string;
  given_name: string;
  family_name: string;
  picture: string;
  locale: string;
  hd: string;
}

export async function getGoogleUser(accessToken: string): Promise<GoogleUser> {
  const response = await fetch(
    "https://www.googleapis.com/oauth2/v1/userinfo?alt=json",
    {
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
    },
  );
  if (!response.ok) {
    await response.body?.cancel();
    throw new Error(`Failed to fetch Google user: ${response.status}`);
  }
  return (await response.json()) as GoogleUser;
}
